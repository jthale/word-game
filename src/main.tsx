// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';
import { Intro } from './intro.js';
import { Preview } from './preview.js';
import { key, userKey, startingSolver } from './helpers.js';
import { Phrase } from './phrase.js';
import { Guess } from './guess.js';
import { Guessed } from './components/guessed.js';
import { Divider } from './components/divider.js';

Devvit.configure({
  redis: true,
  redditAPI: true,
});

type WordPost = {
  'author': string,
  'word': string,
  'solved': string,
  'isSolved': string
};

export type Props = {
  word: string;
  solved: string;
  setSolved: (solved: string) => void;
}

const WordForm = Devvit.createForm(
  {
    title: 'Create a Community Word',
    fields: [
      { name: 'title', label: 'Post Title', type: 'string', required: true },
      { name: 'word', label: 'Word', type: 'string', required: true }
    ],
    acceptLabel: 'Next',
  },
  async (event, { reddit, subredditId, ui, redis, userId }) => {
    try {
      
      // Don't allow _ in the submission

      const formData = event.values;
      if (!formData.word) {
        ui.showToast('A word to match is required');
        return;
      }

      const subredditName = (await reddit.getSubredditById(subredditId))?.name;
      if (!subredditName) {
        ui.showToast('Something went wrong, try again tomorrow');
        return;
      }
      
      const post = await reddit.submitPost({
        title: `[Community Word] ${formData.title}`,
        subredditName,
        preview: Preview(),
      });

      // Store word in redis
      // Change to hash cache with word / author / solved / currentState?
      await redis.hSet(key('word', post.id),{
        'author': userId ? userId : '',
        'word': formData.word.toUpperCase(),
        'solved': startingSolver(formData.word), // get this in a function
        'isSolved': 'false'
      });

      ui.showToast(`Community Word created!`);
      ui.navigateTo(post);
    } catch (e) {
      console.log(event.values);
      ui.showToast('Something went wrong, please try again later.');
    }
  }
);

Devvit.addMenuItem({
  label: 'Add Community Word Game',
  location: 'subreddit',
  onPress: async (_event, context) => {
    const { ui } = context;
    ui.showForm(WordForm);
  },
});

const App: Devvit.CustomPostComponent = (context) => {
  const useState = context.useState;
  const redis = context.redis;
  const ui = context.ui;
  const postId = context.postId || 'test';
  const user = userKey(context.userId, postId);
  
  const [word, setWord] = useState<string | undefined>(undefined);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [solved, setSolved] = useState<string | undefined>(undefined);
  const [hasGuessed, setHasGuessed] = useState<boolean>(false);


  // TODO: Reload every 20 sec with a timer indicator?
  const loadContent = async () => {
    try {
      setIsSolved(await redis.hGet(key('word', postId), 'isSolved') === "true");
      setWord(await redis.hGet(key('word', postId), 'word'));
      setSolved(await redis.hGet(key('word', postId), 'solved'));
      setHasGuessed(!!(await redis.get(user)));
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  // Delay this until the intro is complete
  useState(loadContent);

  // Show word state after loading is done and min X amount time
  if(word && solved) {
    // Change to single props for all
    const props: Props = {
      word,
      solved,
      setSolved
    }

    if(isSolved) {
      return (
        <vstack alignment="center middle" gap="medium" height={100}>
          {word ? (<Phrase {...props} />) : ('') }
          <Divider />
          <text size="large" weight="bold" alignment="center middle">SOLVED</text>
        </vstack>
      )
    }

    // need to add has voted flag for guess button
    return (
      <vstack alignment="center middle" gap="medium" height={100}>
        {word ? (<Phrase {...props} />) : ('') }
        <Divider />
        {hasGuessed ? (<Guessed />) : (<Guess {...props} />)}
      </vstack>
    )
  }

  return <Intro />;
};

Devvit.addCustomPostType({
  name: 'Community Word',
  height: 'regular',
  render: App,
});

export default Devvit;