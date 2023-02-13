"use strict";

import { UserController } from "../app/Controllers/UserController.js";
const userController = new UserController();

export default function (fastify, opts, next) {
  fastify.post('/users', {
    handler: userController.create
  });

  fastify.get('/users', {
    //preValidation: fastify.auth([fastify.verifyJWT]),
    handler: userController.list
  });

  next();
}
