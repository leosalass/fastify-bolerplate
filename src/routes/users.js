"use strict";

import { UserController } from "../app/Controllers/UserController.js";

export default function (app, opts, next)
{
  const userController = new UserController(app.jwt);

  app.get('', {
    handler: userController.list
  });

  app.get('/current', {
    handler: userController.current
  });

  app.patch('', {
    handler: userController.update
  });

  app.delete('', {
    handler: userController.delete
  });

  next();
}
