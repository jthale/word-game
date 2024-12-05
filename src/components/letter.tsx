import { Devvit } from '@devvit/public-api';

export type LetterProps = {
    letter: string;
}

//<hstack width="30px" height="40px" alignment="center middle" gap="none"></hstack>

export const Letter: Devvit.BlockComponent<LetterProps> = ({letter}) => {

    const theme = "dark";

    if(letter == " ")
        return <></>;

    return (
        <hstack width="30px" height="40px" alignment="center middle" gap="none" border="thick" cornerRadius="small" borderColor="global-black" darkBackgroundColor='global-white' lightBackgroundColor='global-black'>
            <text size="xxlarge" weight="bold" alignment="center middle" lightColor='global-white' darkColor='global-black'>{letter}</text>
        </hstack>
    );
};