'use strict';

import path from 'path';
import { fileURLToPath } from 'url';

export function set(app, env){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Directories
    const ROOT = path.resolve(__dirname, '..');
    const CONFIG = path.resolve(ROOT, 'config');
    const ROUTES = path.resolve(ROOT, 'routes');
    const PUBLIC = path.resolve(ROOT, 'public');
    const LOGS = path.resolve(ROOT, '../', 'logs');

    // Files
    const ENV = path.resolve(ROOT, '../', '.env');

    app.decorate('helpers', {
        directory: {
            ROOT,
            CONFIG,
            ROUTES,
            LOGS,
            PUBLIC
        }
    });

    app.decorate('env', env);
}