import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ENOENT_ERROR_CODE = 'ENOENT';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const readFilePath = resolve(__dirname, 'files', 'fileToRead.txt');

    try {
        const content = await readFile(readFilePath, {
            encoding: 'utf8'
        });

        console.log(content);
    } catch (err) {
        if (err.code === ENOENT_ERROR_CODE) {
            throw new Error('FS operation failed');
        }
        throw err;
    }
};

await read();