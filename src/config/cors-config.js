'use strict';
import cors from '@fastify/cors';

export function set(app){
    app.register(cors, {
    origin: true,
    credentials: true,

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
}