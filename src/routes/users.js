"use strict";

import { UserController } from "../app/Controllers/UserController.js";
const userController = new UserController();

export default function (app, opts, next) {
  app.post('/users', {
    handler: userController.create
  });

  app.get('/users', {
    handler: userController.list
  });

  app.patch('/users', {
    //preValidation: fastify.auth([fastify.verifyJWT]),
    handler: userController.update
  });

  app.delete('/users/:email', {
    //preValidation: fastify.auth([fastify.verifyJWT]),
    handler: userController.delete
  });

  next();
}
