"use strict";

import User from "../Models/User.js";

export class UserController {
  async list(req, reply) {
    try {
      const users = await User.list();
      reply.send(users);
    } catch (error) {
      reply.status(400).send(error);
    }
  }

  async update(request, reply) {
    try {
      const user = await User.update(request.body);
      reply.status(201).send(user);
    } catch (error) {
      reply.status(400).send(error);
    }
  }

  async delete(request, reply) {
    try {
      await User.delete(request.params.email);
      reply.status(201).send({ message: 'User successfully deleted' });
    } catch (error) {
      reply.status(400).send(error);
    }
  }
}
