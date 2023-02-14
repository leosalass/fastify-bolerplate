"use strict";

import { UserController } from "../app/Controllers/UserController.js";
const userController = new UserController();

export default function (app, opts, next) {

  app.get('', {
    handler: userController.list
  });

  app.patch('', {
    //preValidation: fastify.auth([fastify.verifyJWT]),
    handler: userController.update
  });

  app.delete('/:email', {
    //preValidation: fastify.auth([fastify.verifyJWT]),
    handler: userController.delete
  });

  next();
}
