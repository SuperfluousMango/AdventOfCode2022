import { inputData } from './data';

// Ugh, so much iteration. There has to be a less O^2 way to do this.
console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData);

    let visibleTreeCount = 0;
    // Every tree on the borders is visible, so add all of those
    visibleTreeCount += (data.length * 2) + (data[0].length * 2) - 4; // Don't double-count the corners;

    // Because all the borders are visible, only examine the middle trees
    for (let y = 1; y < data.length - 1; y++) {
        for (let x = 1; x < data[y].length - 1; x++) {
            const curTree = data[y][x];

            const treesToTheLeft = data[y].slice(0, x),
                treesToTheRight = data[y].slice(x + 1),
                treesToTheTop = data.slice(0, y).map(row => row[x]),
                treesToTheBottom = data.slice(y + 1).map(row => row[x]);

            if (treesToTheLeft.every(t => t < curTree) ||
                treesToTheRight.every(t => t < curTree) ||
                treesToTheTop.every(t => t < curTree) ||
                treesToTheBottom.every(t => t < curTree)) {
                visibleTreeCount++;
            }
        }
    }

    return visibleTreeCount;
}

function puzzleB() {
    const data = splitInput(inputData);

    let maxViewDistance = 0;
    // Because trees on the edges will have at least one viewing distance of zero, the product
    // of their viewing distances will also be zero, so we can safely ignore them.
    for (let y = 1; y < data.length - 1; y++) {
        for (let x = 1; x < data[y].length - 1; x++) {
            const curTree = data[y][x];

            const leftViewingDistance = getViewingDistance(curTree, data[y].slice(0, x), true),
                rightViewingDistance = getViewingDistance(curTree, data[y].slice(x + 1)),
                topViewingDistance = getViewingDistance(curTree, data.slice(0, y).map(row => row[x]), true),
                bottomViewingDistance = getViewingDistance(curTree, data.slice(y + 1).map(row => row[x])),
                overallViewingDistance = leftViewingDistance * rightViewingDistance * topViewingDistance * bottomViewingDistance;

            if (overallViewingDistance > maxViewDistance) {
                maxViewDistance = overallViewingDistance;
            }
        }
    }

    return maxViewDistance;
}

function splitInput(data: string): number[][] {
    return data.split('\n')
        .map(row => row.split('').map(Number));
}

function getViewingDistance(curTree: number, otherTrees: number[], reverse = false) {
    if (reverse) {
        otherTrees.reverse();
    }

    const idx = otherTrees.findIndex(t => t >= curTree);
    return idx === -1
        ? otherTrees.length // There were no trees blocking our view, so we were able to see the whole distance
        : idx + 1; // Adjust for 0-based arrays
}