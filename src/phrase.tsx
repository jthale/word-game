import { Devvit, FormKey, UIClient, useForm } from '@devvit/public-api';
// import { Letter } from './components/letter.js';
import { Props } from './main.js';
import { Word } from './word.js';

export const Phrase: Devvit.BlockComponent<Props> = (props, {redis, ui, userId, postId}) => {

    const wordArray = props.solved.split(" ");

    console.log("Word: " + props.word);
    console.log("Word count: " + wordArray.length);

    const words = wordArray.map(word => { 
        return <Word word={word} />
    });

    return (<>{words}</>);
};
