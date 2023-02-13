'use strict';

import Fastify from 'fastify';
import * as Config from './config/config.js';
import env from './config/env-config.js';
import log from './config/log-config.js';
import fastifyPrintRoutes from 'fastify-print-routes'

const { ENVIRONMENT, PORT } = env;

const app = Fastify({
  logger: log.config[ENVIRONMENT] ?? true // defaults to true if no entry matches in the map
});

await app.register(fastifyPrintRoutes)

Config.set(app, env);

await app.listen({ port: PORT })