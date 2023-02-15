"use strict";

import User from "../Models/User.js";

export class UserController {

  constructor(app) {
    this.app = app;
  }

  async list(request, reply) {
    try {
      // Verify JWT token
      await request.jwtVerify();

      const users = await User.list();
      reply.send(users);
    } catch (error) {
      reply.status(400).send(error);
    }
  }

  async update(request, reply) {
    try {
      // Verify JWT token
      await request.jwtVerify();

      const user = await User.update(request);
      reply.status(201).send(user);
    } catch (error) {
      reply.status(400).send(error);
    }
  }

  async delete(request, reply) {
    try {
      // Verify JWT token
      await request.jwtVerify();

      const token = request.jwtToekn;
      await User.delete(request.user.email);

      /**
       * TODO: implement a token remoke
       */

      reply.status(201).send({ message: 'User successfully deleted' });
    } catch (error) {
      reply.status(400).send(error);
    }
  }
}
