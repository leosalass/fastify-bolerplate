'use strict';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const CONFIG = path.resolve(ROOT, 'config');
const ROUTES = path.resolve(ROOT, 'routes');
const PUBLIC = path.resolve(ROOT, 'public');
const LOGS = path.resolve(ROOT, '../', 'logs');

export default {
    directory: {
        ROOT,
        CONFIG,
        ROUTES,
        LOGS,
        PUBLIC
    }
}