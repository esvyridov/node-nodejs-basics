import { createReadStream } from 'node:fs'
import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';
import { createHash } from 'node:crypto'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
    return new Promise((resolve, reject) => {
        const hash = createHash('sha256');
        const fileToHashPath = resolvePath(__dirname, 'files', 'fileToCalculateHashFor.txt');
        const reader = createReadStream(fileToHashPath);

        reader.on('error', reject);
        reader.on('readable', () => {
            const data = reader.read();

    
            if (data) {
                hash.update(data);
            } else {
                console.log(hash.digest('hex'));
                resolve();
            }
        });
    });
};

await calculateHash();