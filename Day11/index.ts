import { inputData } from './data';

class Operation {
    readonly operandX: string | number;
    readonly operator: string;
    readonly operandY: string | number;

    constructor(inputStr: string) {
        const regex = /^\s+Operation: new = (.+) (.) (.+)$/,
            [_, opX, op, opY] = inputStr.match(regex);
        this.operandX = Number(opX) || opX;
        this.operator = op;
        this.operandY = Number(opY) || opY;
    }

    updateWorry(oldWorry: number): number {
        const opX = Number(this.operandX) || oldWorry,
            opY = Number(this.operandY) || oldWorry;

        switch (this.operator) {
            case '+':
                return opX + opY;
            case '-':
                return opX - opY;
            case '*':
                return opX * opY;
            case '/':
                return opX / opY;
            default:
                throw new Error(`Invalid operator ${this.operator}`);
        }
    }
}

class WorryTest {
    readonly divisor: number;
    readonly trueTarget: number;
    readonly falseTarget: number;

    constructor([ divisorStr, trueStr, falseStr ]: string[]) {
        this.divisor = Number(divisorStr.replace('  Test: divisible by ', ''));
        this.trueTarget = Number(trueStr.replace('    If true: throw to monkey ', ''));
        this.falseTarget = Number(falseStr.replace('    If false: throw to monkey ', ''));
    }

    runTest(worry: number): number {
        return worry % this.divisor === 0
            ? this.trueTarget
            : this.falseTarget;
    }
}

class Monkey {
    public itemsConsidered = 0;

    constructor(
        public items: number[],
        public operation: Operation,
        public worryTest: WorryTest
    ) { }

    processItems(allowRelief = true): [number, number][] {
        const results: [number, number][] = [];
        while (this.items.length) {
            const curWorry = this.items.shift(),
                updatedWorry = this.operation.updateWorry(curWorry),
                postReliefWorry = allowRelief ? Math.floor(updatedWorry / 3) : updatedWorry;

            results.push([postReliefWorry, this.worryTest.runTest(postReliefWorry)]);
            this.itemsConsidered++;
        }

        return results;
    }

    receiveItem(worry: number): void {
        this.items.push(worry);
    }
}

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const monkeys = splitInput(inputData);

    for (let i = 0; i < 20; i++) {
        for (let m = 0; m < monkeys.length; m++) {
            const results = monkeys[m].processItems();
            results.forEach(([itemWorry, monkeyIndex]) => monkeys[monkeyIndex].receiveItem(itemWorry));
        }
    }

    const consideration = monkeys.map(m => m.itemsConsidered);
    let maxItems = 0,
        nextItems = 0;
    consideration.forEach(items => {
        if (items > maxItems) {
            nextItems = maxItems;
            maxItems = items;
        } else if (items > nextItems) {
            nextItems = items;
        }
    });

    return maxItems * nextItems;
}

function puzzleB() {
    const monkeys = splitInput(inputData),
        worryCeiling = monkeys.map(m => m.worryTest.divisor)
            .reduce((acc, val) => val * acc, 1);

    // If we just let this run, the numbers will rapidly get too large, because we're no longer dividing worry by 3 every time.
    // Since all the WorryTest divisors are prime, we can multiply all of them together to find the largest modulo which applies
    // to each of them.

    for (let i = 0; i < 10000; i++) {
        for (let m = 0; m < monkeys.length; m++) {
            const results = monkeys[m].processItems(false);
            results.forEach(([itemWorry, monkeyIndex]) => monkeys[monkeyIndex].receiveItem(itemWorry % worryCeiling));
        }
    }

    const consideration = monkeys.map(m => m.itemsConsidered);
    let maxItems = 0,
        nextItems = 0;
    consideration.forEach(items => {
        if (items > maxItems) {
            nextItems = maxItems;
            maxItems = items;
        } else if (items > nextItems) {
            nextItems = items;
        }
    });

    return maxItems * nextItems;
}

function splitInput(data: string): Monkey[] {
    const monkeyData = data.split('\n\n');
    
    return monkeyData.map(text => {
        const lines = text.split('\n');
        lines.shift(); // Dump the first line, which is always "Monkey N:"

        const startingItems = lines.shift()
            .replace('  Starting items: ', '')
            .split(', ')
            .map(Number);
        const operation = new Operation(lines.shift());
        const worryTest = new WorryTest(lines);

        return new Monkey(startingItems, operation, worryTest);
    });
}
