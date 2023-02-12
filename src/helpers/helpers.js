'use strict';

import path from 'path';
import { fileURLToPath } from 'url';
import cors from '@fastify/cors';
import favicon from 'fastify-favicon';

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

    app.register(cors, {
    origin: '*',

    /**
     * *By default, @fastify/cors adds a onRequest hook where the validation
     * *and header injection are executed. This can be customized by passing
     * *hook in the options.
     *
     * Valid values are:
     * onRequest, preParsing, preValidation, preHandler, preSerialization, and onSend
     *
     * *Hook definitions
     * onRequest: Este hook se activa cuando se recibe una solicitud.
     * preParsing: Este hook se activa antes de parsear la solicitud.
     * preValidation: Este hook se activa antes de validar la solicitud.
     * preHandler: Este hook se activa antes de manejar la solicitud.
     * preSerialization: Este hook se activa antes de serializar la respuesta.
     * onSend: Este hook se activa cuando se envia una respuesta completa.
    */
   hook: 'preHandler',

   allowedHeaders: ['Content-Type', 'Authorization'],

   methods: ["GET","POST", "DELETE", "PUT", "PATCH"]
  })

  app.register(favicon, { path: app.helpers.directory.PUBLIC, name: 'favicon.ico', maxAge: 3600 })
}