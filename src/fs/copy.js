import { cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const CP_EEXIST_ERROR_CODE = 'ERR_FS_CP_EEXIST';
const ENOENT_ERROR_CODE = 'ENOENT';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const targetFolderPath = resolve(__dirname, 'files');
    const destinationFolderPath = resolve(__dirname, 'files_copy');

    try {
        await cp(targetFolderPath, destinationFolderPath, {
            force: false,
            recursive: true,
            errorOnExist: true,
        });
    } catch (err) {
        if ([CP_EEXIST_ERROR_CODE, ENOENT_ERROR_CODE].includes(err.code)) {
            throw new Error('FS operation failed');
        }
        throw err;
    }
};

await copy();