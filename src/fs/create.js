import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const EEXIST_ERROR_CODE = 'EEXIST';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const filePath = resolve(__dirname, 'files', 'fresh.txt');
    
    try {
        await writeFile(filePath, 'I am fresh and young', {
            flag: 'wx'
        });
    } catch (err) {
        if (err.code === EEXIST_ERROR_CODE) {
            throw new Error('FS operation failed');
        }
        throw(err);
    }
};

await create();