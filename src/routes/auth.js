"use strict";

import { AuthController } from "../app/Controllers/AuthController.js";

export default function (app, opts, next) {
  const authController = new AuthController(app.jwt);

  app.post('/register', {
    handler: authController.register
  });

  app.post('/login', {
    handler: authController.login
  });

  next();
}
