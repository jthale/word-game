import { Devvit } from '@devvit/public-api';

export type LetterProps = {
    letter: string;
}

//<hstack width="30px" height="40px" alignment="center middle" gap="none"></hstack>

export const Letter: Devvit.BlockComponent<LetterProps> = ({letter}) => {

    if(letter == " ")
        return <></>;

    return (
        <hstack width="30px" height="40px" alignment="center middle" gap="none" border="thick" cornerRadius="small" borderColor="global-black">
            <text size="xxlarge" weight="bold" alignment="center middle">{letter}</text>
        </hstack>
    );
};