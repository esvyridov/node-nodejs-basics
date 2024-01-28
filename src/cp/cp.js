import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
    const scriptPath = resolve(__dirname, 'files', 'script.js');
    const script = spawn('node', [scriptPath, ...(args ?? [])]);

    script.stdout.pipe(process.stdout);
    process.stdin.pipe(script.stdin);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['-h'])