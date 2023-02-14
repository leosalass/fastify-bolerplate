"use strict";

import { AuthController } from "../app/Controllers/AuthController.js";
const authController = new AuthController();

export default function (app, opts, next) {
  app.post('/register', {
    handler: authController.register
  });

  next();
}
