"use strict";

import User from "../Models/User.js";

export class AuthController {
  async register(req, replay) {
    try {
      const user = await User.createUser(req.body);
      replay.status(201).send(user);
    } catch (error) {
      replay.status(400).send(error);
    }
  }
}
