"use strict";

import { UserController } from "../app/Controllers/UserController.js";

export default function (app, opts, next)
{
  const userController = new UserController(app);

  app.get('', {
    handler: userController.list
  });

  app.patch('', {
    //preValidation: fastify.auth([fastify.verifyJWT]),
    handler: userController.update
  });

  app.delete('', {
    //preValidation: fastify.auth([fastify.verifyJWT]),
    handler: userController.delete
  });

  next();
}
