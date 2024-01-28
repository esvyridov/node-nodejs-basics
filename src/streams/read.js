import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';
import { createReadStream } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    return new Promise((resolve, reject) => {
        const fileToReadPath = resolvePath(__dirname, 'files', 'fileToRead.txt');
        const reader = createReadStream(fileToReadPath);
        
        reader.on('error', reject)
        reader.on('end', resolve);
    
        reader.pipe(process.stdout);
    });
};

await read();