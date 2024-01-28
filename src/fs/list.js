import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ENOENT_ERROR_CODE = 'ENOENT';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
    const filesFolderPath = resolve(__dirname, 'files');

    try {
        const files = await readdir(filesFolderPath);

        console.log(files)
    } catch (err) {
        if (err.code === ENOENT_ERROR_CODE) {
            throw new Error('FS operation failed');
        }
        throw err;
    }
};

await list();