import { inputData } from './data';

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData);

    return data.filter(oneContainsAnother).length;
}

function puzzleB() {
    const data = splitInput(inputData);

    return data.filter(oneOverlapsAnother)
        .length;
}

function splitInput(data: string): number[][][] {
    return data.split('\n')
        .map(x => x.split(',')
            .map(y => y.split('-').map(Number))
        );
}

function oneContainsAnother([[ start1, end1 ], [ start2, end2 ]]): boolean {
    return (start2 >= start1 && end2 <= end1) || (start1 >= start2 && end1 <= end2)
}

function oneOverlapsAnother([[ start1, end1 ], [ start2, end2 ]]): boolean {
    return (start2 >= start1 && start2 <= end1) ||
        (end2 >= start1 && end2 <= end1) ||
        (start1 >= start2 && start1 <= end2) ||
        (end1 >= start2 && end1 <= end2);
}
