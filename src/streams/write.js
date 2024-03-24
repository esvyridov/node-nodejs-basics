import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';
import { createWriteStream } from 'node:fs';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const write = async () => {
    return new Promise((resolve) => {
        const fileToWritePath = resolvePath(__dirname, 'files', 'fileToWrite.txt');
        const writer = createWriteStream(fileToWritePath);

        process.stdin.on('end', resolve);

        process.stdin.pipe(writer);
    });
};

await write();