'use strict';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '..', '..', '.env');
import dotenv from 'dotenv'

dotenv.config({
    path: envPath
});

export default {
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT,
    ENVIRONMENT: process.env.ENVIRONMENT,
    LOG_LEVEL: process.env.LOG_LEVEL,

    JWT_SECRET: process.env.JWT_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET,

    MONGO_DB_PORT: process.env.MONGO_DB_PORT,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    MONGO_DB_USER: process.env.MONGO_DB_USER,
    MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD,

    ATLAS_DB_NAME: process.env.ATLAS_DB_NAME,
    ATLAS_USER: process.env.ATLAS_USER,
    ATLAS_PASSWORD: process.env.ATLAS_PASSWORD,
    ATLAS_CLUSTER: process.env.ATLAS_CLUSTER,
    ATLAS_OPTIONS: process.env.ATLAS_OPTIONS
}