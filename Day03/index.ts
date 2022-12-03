import { inputData } from './data';

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData);

    return data.reduce((acc, val) => {
        const firstHalf = val.slice(0, val.length / 2),
            secondHalf = val.slice(val.length / 2),
            uniqueLettersInFirstHalf = new Set<string>(firstHalf.split('')),
            uniqueLettersInSecondHalf = new Set<string>(secondHalf.split(''));

        uniqueLettersInSecondHalf.forEach(x => {
            if (uniqueLettersInFirstHalf.has(x)) {
                acc += getPriority(x);
            }
        });

        return acc;
    }, 0);
}

function puzzleB() {
    const data = splitInput(inputData);

    let totalPriority = 0;
    while (data.length) {
        const curGroup = data.splice(0, 3),
            uniqueLettersInFirstPack = new Set<string>(curGroup[0].split('')),
            uniqueLettersInSecondPack = new Set<string>(curGroup[1].split('')),
            uniqueLettersInThirdPack = new Set<string>(curGroup[2].split(''));

        uniqueLettersInFirstPack.forEach(x => {
            if (uniqueLettersInSecondPack.has(x) && uniqueLettersInThirdPack.has(x)) {
                totalPriority += getPriority(x);
            }
        });
    }

    return totalPriority;
}

function splitInput(data: string): string[] {
    return data.split('\n');
}

function getPriority(item: string): number {
    const charCode = item.charCodeAt(0),
        baseLowercaseCharCode = 'a'.charCodeAt(0),
        baseUppercaseCharCode = 'A'.charCodeAt(0);

    if (charCode >= baseLowercaseCharCode) {
        // 1 - 26
        return charCode - baseLowercaseCharCode + 1;
    } else {
        // 27 - 52
        return charCode - baseUppercaseCharCode + 1 + 26;
    }
}
