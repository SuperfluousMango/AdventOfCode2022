import { inputData } from './data';

interface Instructions {
    count: number;
    from: number;
    to: number;
}

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const [stack, instructions] = splitInput(inputData);

    instructions.forEach(instr => {
        for (let i = 0; i < instr.count; i++) {
            stack[instr.to].unshift(stack[instr.from].shift());
        }
    });

    return stack.map(x => x[0])
        .join('');
}

function puzzleB() {
    const [stack, instructions] = splitInput(inputData);

    instructions.forEach(instr => {
        const movedCrates = stack[instr.from].slice(0, instr.count);
        stack[instr.from].splice(0, instr.count);
        stack[instr.to].unshift(...movedCrates);
    });

    return stack.map(x => x[0])
        .join('');
}

function splitInput(data: string): [string[][], Instructions[]] {
    let stackLines: string,
        instrLines: string;

    [stackLines, instrLines] = data.split('\n\n');

    // Process stacks
    const stacks: string[][] = [],
        stackChunkRegex = /.{3}\s?/g,
        onlyLettersRegex = /[^A-Z]/g;
    stackLines.split('\n')
        .forEach(line => {
            const thingsInStacks = Array.from(line.matchAll(stackChunkRegex))
                .map(matches => matches[0])
                .map(x => x.replace(onlyLettersRegex, ''));
            
            thingsInStacks.forEach((val, idx) => {
                if (!val) {
                    return;
                }
                
                if (!stacks[idx + 1]) {
                    stacks[idx + 1] = [];
                }

                stacks[idx + 1].push(val);
            });
        });

    // Process instructions
    const instrRegex = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/g,
        instructions = instrLines.split('\n')
            // This ~abuses~ takes advantage of how named capture groups are returned
            // We're using names that match the Instructions interface
            .map(line => Array.from(line.matchAll(instrRegex))[0].groups as unknown as Instructions);
        
    return [stacks, instructions];
}
