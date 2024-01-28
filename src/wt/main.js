import { cpus } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { Worker } from 'node:worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
    const workerPath = resolve(__dirname, 'worker.js');
    const numsToCompute = new Array(cpus().length).fill(undefined).map((_, i) => i + 10);

    console.log(
        (await Promise.allSettled(numsToCompute.map((num) => {
            return new Promise((resolve, reject) => {
                const worker = new Worker(workerPath);

                worker.once('message', resolve);
                worker.once('error', reject);

                worker.postMessage(num);
            });
        }))).map((value) => value.status === 'fulfilled' ? ({
            status: 'resolved',
            data: value.value,
        }) : ({
            status: 'error',
            data: null,
        }))
    );
};

await performCalculations();