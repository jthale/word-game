import { Devvit } from '@devvit/public-api';

export const key = (keyType: string, postId: string | undefined): string => {
    return `communityWord:${postId ?? undefined}:${keyType}`;
};

export const userKey = (userId: string | undefined, postId: string | undefined): string => {
    return `communityWord:${postId ?? undefined}:${userId ?? undefined}`;
};

export const startingSolver = (word: string): string => {
    const wordArray = word.toUpperCase().split("");
    const starter = wordArray.map((letter) => {
        if(letter === ' ')
            return ' ';
        else
            return '_';
        }).join('');
    return starter;
}