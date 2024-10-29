import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Environment variables interface
interface Config {
    msAccessToken: string;
    port: number;
    nodeEnv: string;
}

// Validate environment variables
const validateConfig = (config: Config): void => {
    const missingVars: string[] = [];

    if (!config.msAccessToken) missingVars.push('MS_ACCESS_TOKEN');
    if (!config.port) missingVars.push('PORT');
    if (!config.nodeEnv) missingVars.push('NODE_ENV');

    if (missingVars.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missingVars.join(', ')}\n` +
            'Please check your .env file or environment variables.'
        );
    }
};

// Create and validate config object
const config: Config = {
    msAccessToken: process.env.MS_ACCESS_TOKEN || '',
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development'
};

validateConfig(config);

export default config;