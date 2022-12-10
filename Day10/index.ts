import { inputData } from './data';

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData);

    let cycle = 1,
        reg = 1,
        totalSignalStrength = 0;

    data.forEach((instr, idx) => {
        if (cycle > 220) {
            return;
        }

        if (cycle % 40 === 20) {
            totalSignalStrength += reg * cycle;
        }

        if (instr === 'noop') {
            // instruction takes 1 cycle and does nothing - increment cycle counter and keep moving
            cycle++;
        } else {
            // instruction takes 2 cycles, but could overlap our check interval
            // increment once, check whether we've hit our interval, increment again, then update register
            cycle++;
            if (cycle % 40 === 20) {
                totalSignalStrength += reg * cycle;
            }
            cycle++;
            reg += Number(instr.split(' ')[1]);
        }
    });

    return totalSignalStrength;
}

function puzzleB() {
    const data = splitInput(inputData);

    let cycle = 1,
        reg = 1,
        output = '';

    data.forEach((instr, idx) => {
        if (instr === 'noop') {
            // instruction takes 1 cycle and does nothing - update display, increment cycle counter, and keep moving
            output += getOutputChar(cycle, reg);
            cycle++;
        } else {
            // instruction takes 2 cycles, but could overlap our check interval
            // update output, increment once, update output again, increment again, then update register 
            output += getOutputChar(cycle, reg);
            cycle++;
            output += getOutputChar(cycle, reg);
            cycle++;
            reg += Number(instr.split(' ')[1]);
        }
    });

    return '\n' + output.match(/.{40}/g).join('\n');
}

function splitInput(data: string): string[] {
    return data.split('\n');
}

function getOutputChar(cycle: number, reg: number): string {
    const pixelsToCheck = [
        (cycle - 2) % 40,
        (cycle - 1) % 40,
        cycle % 40
    ];

    return pixelsToCheck.includes(reg)
        ? '#'
        : '.';
}
