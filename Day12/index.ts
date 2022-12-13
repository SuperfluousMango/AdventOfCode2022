import { inputData } from './data';

interface Position {
    x: number;
    y: number;
}

interface HeightData {
    heightMap: Map<string, number>;
    distanceMap: Map<string, number>;
    startPos: Position;
    endPos: Position;
    maxX: number;
    maxY: number;
}

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const heightData = splitInput(inputData),
        queue = [heightData.startPos];

    heightData.distanceMap.set(`${heightData.startPos.x},${heightData.startPos.y}`, 0);

    while (queue.length) {
        const pos = queue.shift();
        queue.push(...processDistance(pos, heightData));
    }

    const endPosStr = `${heightData.endPos.x},${heightData.endPos.y}`;
    return heightData.distanceMap.get(endPosStr);
}

function puzzleB() {
    // This part could also have been solved by looking at the map - the only way to get to an A is through a B, and the
    // only place that happens is the column right next to the start position
    const heightData = splitInput(inputData),
        queue = [heightData.endPos];

    heightData.distanceMap.set(`${heightData.endPos.x},${heightData.endPos.y}`, 0);

    while (queue.length) {
        const pos = queue.shift();
        queue.push(...processDistance(pos, heightData, false));
    }

    const groundLevelPositions = Array.from(heightData.heightMap.entries())
        .filter(([_, height]) => height === 0)
        .map(([pos, _]) => pos);
    const distancesToGroundLevel = groundLevelPositions.map(pos => heightData.distanceMap.get(pos))
        .filter(d => !isNaN(d));
    return Math.min(...distancesToGroundLevel);
}

function splitInput(data: string): HeightData {
    const result = data.split('\n');
    let startPos: Position,
        endPos: Position;

    for (let y = 0; y < result.length; y++) {
        if (result[y].includes('S')) {
            startPos = { x: result[y].indexOf('S'), y };
        }
        if (result[y].includes('E')) {
            endPos = { x: result[y].indexOf('E'), y };
        }

        if (startPos && endPos) {
            break;
        }
    }

    const heightMap = new Map<string, number>(),
        heights = new Map<string, number>(
            'abcdefghijklmnopqrstuvwxyz'.split('')
                .map((char, idx) => [char, idx])
        );
        heights.set('S', 0); // Same as 'a'
        heights.set('E', 25); // Same as 'z'
    
    result.forEach((line, y) => {
        line.split('')
            .forEach((char, x) => {
                heightMap.set(`${x},${y}`, heights.get(char));
            });
    });

    return {
        heightMap,
        distanceMap: new Map<string, number>(),
        startPos,
        endPos,
        maxX: result[0].length - 1,
        maxY: result.length - 1
    }
}

function processDistance(pos: Position, heightData: HeightData, goingUp = true): Position[] {
    const posStr = `${pos.x},${pos.y}`,
        curHeight = heightData.heightMap.get(posStr),
        curDist = heightData.distanceMap.get(posStr),
        neighbors = getNeighbors(pos, heightData.maxX, heightData.maxY),
        validNeighbors = neighbors.filter(n => {
            const nStr = `${n.x},${n.y}`,
                zDelta = goingUp ? -1 : 1
            // We want neighbors that are
            //   a) No more than one step higher than we are, and
            //   b) Mapped with a distance longer than our current route (or still unmapped)
            return (
                    (goingUp && heightData.heightMap.get(nStr) <= curHeight + 1) ||
                    (!goingUp && heightData.heightMap.get(nStr) >= curHeight - 1)
                ) &&
                (heightData.distanceMap.get(nStr) ?? 999999999) > curDist + 1;
        });

    validNeighbors.forEach(n => heightData.distanceMap.set(`${n.x},${n.y}`, curDist + 1));
    return validNeighbors;
}

function getNeighbors(pos: Position, maxX: number, maxY: number) {
    const neighbors = [
        { x: pos.x - 1, y: pos.y },
        { x: pos.x + 1, y: pos.y },
        { x: pos.x, y: pos.y - 1 },
        { x: pos.x, y: pos.y + 1 }
    ];

    return neighbors.filter(p => p.x >= 0 && p.x <= maxX && p.y >= 0 && p.y <= maxY);
}
