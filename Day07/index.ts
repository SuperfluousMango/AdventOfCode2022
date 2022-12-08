import { inputData } from './data';

interface File {
    name: string;
    size: number;
}

class Directory {
    files: File[] = [];
    children: Directory[] = [];

    private sizeCache: number | undefined;

    constructor(public name: string, public parent: Directory | null = null) { }

    getSize(): number {
        if (this.sizeCache) {
            return this.sizeCache;
        }

        this.sizeCache = this.files.reduce((acc, val) => acc + val.size, 0) +
            this.children.reduce((acc, val) => acc + val.getSize(), 0);
        return this.sizeCache;
    }
}

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData),
        allDirs = processDirectoryTree(data);

    return allDirs.filter(d => d.getSize() <= 100000)
        .reduce((acc, val) => acc + val.getSize(), 0);
}

function puzzleB() {
    const data = splitInput(inputData),
        diskSize = 70_000_000,
        requiredFreeSpace = 30_000_000,
        allDirs = processDirectoryTree(data),
        usedSpace = allDirs[0].getSize(),
        minSpaceToFree = requiredFreeSpace - (diskSize - usedSpace);

    return allDirs.filter(d => d.getSize() > minSpaceToFree)
        .sort((a, b) => a.getSize() - b.getSize())[0].getSize();
}

function splitInput(data: string): string[] {
    return data.split('\n');
}

function processDirectoryTree(data: string[]): Directory[] {
    const rootDir = new Directory('/'),
        allDirs = [rootDir];

    data.shift(); // The first line is always `$ cd /`, so we just end up at the root directory anyway

    let curDir = rootDir;
    while (data.length) {
        const cmd = data.shift();
        if (cmd.startsWith('$ cd ')) {
            // Changing directory - are we going up or further down?
            const targetDir = cmd.substring(5);
            if (targetDir === '..') {
                curDir = curDir.parent;
            } else {
                const newDir = new Directory(targetDir, curDir);
                allDirs.push(newDir);
                curDir.children.push(newDir);
                curDir = newDir;
            }
        } else {
            // Listing files - the only other command we have is "ls"
            while (data.length && data[0][0] !== '$') {
                // Read off every file in the directory
                const fileInfo = data.shift();
                if (fileInfo.startsWith('dir')) {
                    // We'll create the directory when we get around to navigating to it
                    continue;
                }
                
                const [fileSize, fileName] = fileInfo.split(' '),
                    file = {
                        name: fileName,
                        size: Number(fileSize)
                    };
                curDir.files.push(file);
            }
        }
    }
    
    return allDirs;
}