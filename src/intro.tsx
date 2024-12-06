
import { Devvit } from '@devvit/public-api';
import { Props } from './main.js';
import { Word } from './word.js';
import { Divider } from './components/divider.js';


export const Intro = (): JSX.Element => {

    const props1: Props = {
        word: "Community",
        solved: "Community",
        setSolved: () => {},
        setIsSolved: () => {}
    }

    const props2: Props = {
        word: "Word",
        solved: "Word",
        setSolved: () => {},
        setIsSolved: () => {}
    }

    return (
        <vstack alignment="center middle" gap="small" height={100}>
            <Word {...props1} />
            <Divider />
            <Word {...props2} />
        </vstack>
    )
};