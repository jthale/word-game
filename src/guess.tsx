import { Devvit, FormKey, UIClient, useForm } from '@devvit/public-api';
import { Letter } from './components/letter.js';
import { key, userKey } from './helpers.js';
import { Props } from './main.js';

const checkGuess = (word: string, guess: string, solved: string): string => {
    const solvedArray = solved.toUpperCase().split("");

    solvedArray.forEach((letter, index) => {
        if(letter == '_') {
            console.log("Check this index");

            if(guess.charAt(index).toUpperCase() === word.charAt(index).toUpperCase())
                solvedArray[index] = word.charAt(index)
        }
        
    });

    // if match then update solved
    
    return solvedArray.join('');
}

export const Guess: Devvit.BlockComponent<Props> = ({word, solved, setSolved, setIsSolved}, {redis, ui, userId, postId}) => {

    const user = userKey(userId, postId);

    const GuessForm = useForm(
        {
          title: 'Your Community Word Guess',
          fields: [
            { name: 'guess', label: 'Guess', type: 'string', required: true }
          ],
          acceptLabel: 'Next',
        },
        async (values) => {
            // store guess on redis
            await redis.set(user, values.guess.toUpperCase());
            
            // check guess & update
            const updatedSolve = checkGuess(word, values.guess, solved);
            setSolved(updatedSolve);
            setIsSolved(word === updatedSolve);

            // update redis solved state
            await redis.hSet(key('word', postId),{
                'solved': updatedSolve,
            });
        }
      );

    return (
        <button size="medium" appearance='bordered'
            onPress={() => { ui.showForm(GuessForm); }}>
            Guess
        </button>
    );
};
