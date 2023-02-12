'use strict';

import Fastify from 'fastify';
import * as Helper from './helpers/helpers.js';
import * as Cors from './config/cors-config.js';
import env from './config/env-config.js';
import log from './config/log-config.js';

const { ENVIRONMENT } = env;

const app = Fastify({
  logger: log.config[ENVIRONMENT] ?? true // defaults to true if no entry matches in the map
});

Helper.set(app, env);
Cors.set(app);

await app.listen({ port: 3000 })