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

const LOG_FILE = process.env.LOG_FILE;
const APP_NAME = process.env.APP_NAME;
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;

export default {
    LOG_FILE,
    APP_NAME,
    PORT,
    ENVIRONMENT
}