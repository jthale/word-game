import { Devvit, FormKey, UIClient, useForm } from '@devvit/public-api';
import { Letter } from './components/letter.js';
import { Props } from './main.js';

type WordProps = {
    word: string
}

export const Word: Devvit.BlockComponent<WordProps> = ({word}, {redis, ui, userId, postId}) => {

    const wordArray = word.toUpperCase().split("");
    
    const letters = wordArray.map(letter => { 
        return <Letter letter={letter} />
    });

    return (
        <hstack alignment="center middle" gap='small' height='40px'>
            {letters}
        </hstack>
    );
};
