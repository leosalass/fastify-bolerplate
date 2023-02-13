"use strict";

import User from "../Models/User.js";

export class UserController {
  async create(req, replay) {
    try {
      const user = await User.createUser(req.body);
      replay.status(201).send(user);
    } catch (error) {
      replay.status(400).send(error);
    }
  }

  async list(req, reply) {
    try {
      const users = await User.getUsers();
      reply.send(users);
    } catch (error) {
      reply.status(400).send(error);
    }
  }
}
