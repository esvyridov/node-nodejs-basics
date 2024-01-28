import { copyFile, constants } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const EEXIST_ERROR_CODE = 'EEXIST';
const ENOENT_ERROR_CODE = 'ENOENT';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    const wrongFilenamePath = resolve(__dirname, 'files', 'wrongFilename.txt');
    const properFilenamePath = resolve(__dirname, 'files', 'properFilename.md');

    try {
        await copyFile(wrongFilenamePath, properFilenamePath, constants.COPYFILE_EXCL);
    } catch (err) {
        if ([EEXIST_ERROR_CODE, ENOENT_ERROR_CODE].includes(err.code)) {
            throw new Error('FS operation failed');
        }
        throw err;
    }
};

await rename();