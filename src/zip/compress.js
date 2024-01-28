import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    return new Promise((resolve, reject) => {
        const fileToCompressPath = resolvePath(__dirname, 'files', 'fileToCompress.txt');
        const archivePath = resolvePath(__dirname, 'files', 'archive.gz');
        const gzip = createGzip();
    
        const reader = createReadStream(fileToCompressPath);
        const writer = createWriteStream(archivePath);

        reader.on('error', reject);
        writer.on('error', reject);
        writer.on('finish', resolve);
    
        reader.pipe(gzip).pipe(writer);
    });
};

await compress();