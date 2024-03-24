import { createReadStream, createWriteStream } from 'node:fs';
import { createUnzip } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    return new Promise((resolve, reject) => {
        const archiveToDecompressPath = resolvePath(__dirname, 'files', 'archive.gz');
        const filePath = resolvePath(__dirname, 'files', 'fileToCompress.txt');
        const ungzip = createUnzip();

        const reader = createReadStream(archiveToDecompressPath);
        const writer = createWriteStream(filePath);

        reader.on('error', reject);
        writer.on('error', reject);
        writer.on('finish', resolve);

        reader.pipe(ungzip).pipe(writer);
    });
};

await decompress();