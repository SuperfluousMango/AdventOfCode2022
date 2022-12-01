import { inputData } from './data';

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData);

    return Math.max(...data);
}

function puzzleB() {
    const data = splitInput(inputData)
        .sort((a, b) => a - b)
        .reverse();

    return data.slice(0, 3)
        .reduce((acc, val) => acc + val, 0);
}

function splitInput(data: string): number[] {
    return data.split('\n\n')
        .map(lines => {
            return lines.split('\n')
                .map(x => Number(x))
                .reduce((acc, val) => acc + val, 0);
        });
}
