"use strict";

import * as Helper from '../helpers/helpers.js';
import * as Cors from './cors-config.js';
import * as Mongoose from '../config/mongoose-config.js';
import * as Favicon from './favicon-config.js';
import fastifyMultipart from '@fastify/multipart'
import fastifyPrintRoutes from 'fastify-print-routes'
import authRoutes from  '../routes/auth.js';
import userRoutes from  '../routes/users.js';

import fastifyJWT from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
//import fastifyBcrypt from 'fastify-bcrypt';
import fastifySession from '@fastify/session';

export async function set(app, env) {
  Helper.set(app, env);
  Cors.set(app);
  Mongoose.set(app);

  // Register fastify-bcrypt plugin
  /*app.register(fastifyBcrypt, {
    saltWorkFactor: 12
  })*/

  // Register fastify-cookie plugin
  app.register(fastifyCookie);

  // Register fastify-jwt plugin
  app.register(fastifyJWT, {
    secret: app.env.JWT_SECRET
  });

  // Register fastify-session plugin
  app.register(fastifySession, {
    secret: app.env.SESSION_SECRET,
    cookie: {
      secure: true
    }
  });

  // Register fastify-multipart plugin
  app.register(fastifyMultipart);

  // Register fastify-print-routes plugin
  app.register(fastifyPrintRoutes)

  //Register the routes
  app.register(authRoutes, { prefix: '/api/v1/auth' });
  app.register(userRoutes, { prefix: '/api/v1/users' });

  Favicon.set(app);
}
