"use strict";

import * as Helper from '../helpers/helpers.js';
import * as Cors from './cors-config.js';
import * as Mongoose from '../config/mongoose-config.js';
import userRoutes from  '../routes/users.js';
import * as Favicon from './favicon-config.js';
import fastifyMultipart from '@fastify/multipart'
import fastifyPrintRoutes from 'fastify-print-routes'

export async function set(app, env) {
  Helper.set(app, env);
  Cors.set(app);
  Mongoose.set(app);
  app.register(fastifyMultipart);
  app.register(fastifyPrintRoutes)
  app.register(userRoutes, { prefix: '/api/v1' });
  Favicon.set(app);
}
