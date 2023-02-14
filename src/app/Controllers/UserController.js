"use strict";

import User from "../Models/User.js";

export class UserController {
  async list(req, reply) {
    try {
      const users = await User.getUsers();
      reply.send(users);
    } catch (error) {
      reply.status(400).send(error);
    }
  }

  async update(req, replay) {
    try {
      const user = await User.updateUser(req.body);
      replay.status(201).send(user);
    } catch (error) {
      replay.status(400).send(error);
    }
  }

  async delete(req, replay) {
    try {
      await User.deleteUser(req.params.email);
      replay.status(201).send({ message: 'User successfully deleted' });
    } catch (error) {
      replay.status(400).send(error);
    }
  }
}
