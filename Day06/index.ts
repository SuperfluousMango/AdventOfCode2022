import { inputData } from './data';

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData),
        headerSize = 4;

        return findStartOfContent(data, headerSize);
}

function puzzleB() {
    const data = splitInput(inputData),
        headerSize = 14;

    return findStartOfContent(data, headerSize);
}

function splitInput(data: string): string[] {
    return data.split('');
}

function findStartOfContent(data: string[], headerSize: number) {
    let i;
    for (i = 0; i < data.length - headerSize + 1; i++) {
        const set = new Set<string>(data.slice(i, i + headerSize));
        if (set.size === headerSize) {
            break;
        }
    }

    return i + headerSize;
}
