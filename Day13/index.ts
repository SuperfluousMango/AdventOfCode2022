import { inputData } from './data';

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData);

    let correctlyOrderedPairs = 0;

    data.forEach((group, idx) => {
        const leftPacket = JSON.parse(group[0]),
            rightPacket = JSON.parse(group[1]);
        if (packetsAreInOrder(leftPacket, rightPacket)) {
            correctlyOrderedPairs += idx + 1;
        }
    });

    return correctlyOrderedPairs;
}

function puzzleB() {
    const data = splitInput(inputData),
        dividerPacket1 = '[[2]]',
        dividerPacket2 = '[[6]]',
        updatedData = [...data, dividerPacket1, dividerPacket2],
        allPackets = updatedData.flat()
            .map(x => JSON.parse(x)),
        sortedPackets = allPackets.sort((a, b) => {
            return listsAreInOrder(a, b)
                ? -1
                : 1;
        }).map(x => JSON.stringify(x));

    let result = 0;
    for (let i = 0; i < allPackets.length; i++) {
        if (sortedPackets[i] === dividerPacket1) {
            result = i + 1;
        } else if (sortedPackets[i] === dividerPacket2) {
            result *= i + 1;
            break;
        }
    }

    return result;
}

function splitInput(data: string): string[][] {
    return data.split('\n\n')
        .map(group => group.split('\n'));
}

function packetsAreInOrder(leftPacket: any[], rightPacket: any[]): boolean {
    return listsAreInOrder(leftPacket, rightPacket);
}

function itemsAreInOrder(left: any, right: any): boolean | null {
    if (Array.isArray(left) && Array.isArray(right)) {
        // Both are lists - compare
        return listsAreInOrder(left, right);
    } else if (Array.isArray(left)) {
        // Only one is list - convert the other to a list and compare
        return listsAreInOrder(left, [right]);
    } else if (Array.isArray(right)) {
        // Only one is list - convert the other to a list and compare
        return listsAreInOrder([left], right);
    } else if (left === right) {
        // Values are equal - inconclusive result
        return null;
    } else {
        // Values are unequal - if left is lower, packet is valid
        return left < right;
    }
}

function listsAreInOrder(left: any[], right: any[]): boolean | null {
    for (let i = 0; i < left.length; i++) {
        if (right[i] === undefined) {
            // Right list is shorter - invalid packet 
            return false;
        }

        const checkResult = itemsAreInOrder(left[i], right[i]);
        if (checkResult === null) {
            // Inconclusive - keep checking
            continue;
        }

        return checkResult;
    }

    // Either we had exactly equivalent lists or the left list was shorter. If the left list
    // was shorter, the packets are valid.
    if (left.length < right.length) {
        return true;
    }

    // The lists are of the same length - inconclusive result
    return null;
}
