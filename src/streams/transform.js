import { Transform } from 'node:stream';

const reverse = new Transform({
    transform(chunk, _, cb) {
        cb(null, `${chunk.toString().split('').reverse().join('')}\n`)
    }
})

const transform = async () => {
    return new Promise((resolve) => {
        process.stdin.on('end', resolve);

        process.stdin.pipe(reverse).pipe(process.stdout);
    });
};

await transform();