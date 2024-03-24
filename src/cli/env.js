import { env } from 'node:process';

const parseEnv = () => {
    console.log(
        Object.entries(env)
            .filter(([key]) => key.startsWith('RSS_'))
            .map(([key, value]) => `${key}=${value}`)
            .join('; ')
    );
};

parseEnv();