import { inputData } from './data';

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData),
        tailPosSet = new Set<string>();
    let hPos = [0, 0],
        tPos = [0, 0];

    tailPosSet.add('0,0');
    data.forEach(([dir, count]) => {
        for (let i = 0; i < count; i++) {
            hPos = getNewHeadPos(hPos, dir);
            tPos = getNewTailPos(hPos, tPos);
            tailPosSet.add(`${tPos[0]},${tPos[1]}`);
        }
    });

    return tailPosSet.size;
}

function puzzleB() {
    const data = splitInput(inputData),
        tailPosSet = new Set<string>(),
        knotPositions = Array<[number, number]>(10),
        tailKnot = knotPositions.length - 1;

    knotPositions.fill([0, 0]);
    tailPosSet.add('0,0');
    data.forEach(([dir, count]) => {
        for (let i = 0; i < count; i++) {
            knotPositions[0] = getNewHeadPos(knotPositions[0], dir);
            for (let k = 1; k < knotPositions.length; k++) {
                knotPositions[k] = getNewTailPos(knotPositions[k - 1], knotPositions[k]);
            }
            tailPosSet.add(`${knotPositions[tailKnot][0]},${knotPositions[tailKnot][1]}`);
        }
    });

    return tailPosSet.size;
}

function splitInput(data: string): [string, number][] {
    return data.split('\n')
        .map(row => {
            const bits = row.split(' ');
            return [bits[0], Number(bits[1])]
        });
}

function getNewHeadPos([hXpos, hYpos]: number[], dir: string): [number, number] {
    let xDelta = 0,
        yDelta = 0;

    switch (dir) {
        case 'U':
            yDelta = 1;
            break;
        case 'R':
            xDelta = 1;
            break;
        case 'D':
            yDelta = -1;
            break;
        case 'L':
            xDelta = -1;
            break;
    }

    return [hXpos + xDelta, hYpos + yDelta];
}

function getNewTailPos([hXPos, hYPos]: number[], [tXPos, tYPos]: number[]): [number, number] {
    const xDist = Math.abs(hXPos - tXPos),
        yDist = Math.abs(hYPos - tYPos);

    let xDelta = 0,
        yDelta = 0;

    if (xDist >= 2 || yDist >= 2) {
        xDelta = Math.sign(hXPos - tXPos);
        yDelta = Math.sign(hYPos - tYPos);
    }

    return [tXPos + xDelta, tYPos + yDelta];
}
