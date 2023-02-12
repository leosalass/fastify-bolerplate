'use strict';

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helpers from './helpers/helpers.js';
import env from './config/env-config.js';
import log from './config/log-config.js';
import favicon from 'fastify-favicon';

const { ENVIRONMENT } = env;

const app = Fastify({
  logger: log.config[ENVIRONMENT] ?? true // defaults to true if no entry matches in the map
});

app.decorate('helpers', helpers);
app.decorate('env', env);

await app.register(cors, {
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

await app.listen({ port: 3000 })