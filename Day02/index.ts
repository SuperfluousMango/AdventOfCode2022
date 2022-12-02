import { inputData } from './data';

const outcomeMap = new Map<string, number>([
    [ 'R R', 4 ],
    [ 'R P', 8 ],
    [ 'R S', 3 ],
    [ 'P R', 1 ],
    [ 'P P', 5 ],
    [ 'P S', 9 ],
    [ 'S R', 7 ],
    [ 'S P', 2 ],
    [ 'S S', 6 ],
]);

const charMap = {
    A: 'R',
    B: 'P',
    C: 'S',
    X: 'R',
    Y: 'P',
    Z: 'S',
}

const playMap = new Map<string, string[]>([
    //      lose, draw, win
    [ 'A', [ 'S', 'R', 'P' ] ],
    [ 'B', [ 'R', 'P', 'S' ] ],
    [ 'C', [ 'P', 'S', 'R' ] ],
]);

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData);

    return data.reduce((acc, moves) => acc + outcomeMap.get(replaceInput(moves)), 0);
}

function puzzleB() {
    const data = splitInput(inputData),
        xCharCode = 'X'.charCodeAt(0);

    return data.reduce((acc, moves) => {
        const hisMove = moves[0],
            possibleMoves = playMap.get(hisMove),
            myWinLoseDrawSuggestion = moves[2],
            moveIndex = myWinLoseDrawSuggestion.charCodeAt(0) - xCharCode,
            suggestedMove = possibleMoves[moveIndex],
            moveString = replaceInput(`${hisMove} ${suggestedMove}`);

            return acc + outcomeMap.get(moveString);
    }, 0);
}

function splitInput(data: string): string[] {
    return data.split('\n');
}

function replaceInput(moves:string): string {
    return moves.split('')
        .map(x => charMap[x] ?? x)
        .join('');
}