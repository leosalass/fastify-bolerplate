"use strict";

import User from "../Models/User.js";
import UserToken from "../Models/UserToken.js";

export class UserController {
  constructor(jwt) {
    this.jwt = jwt;
  }

  async list(request, reply) {
    try {
      const users = await User.list();
      reply.send(users);
    } catch (error) {
      reply.status(400).send(error);
    }
  }

  async current(request, reply) {
    try {
      const token = request.cookies["api-auth"];
      const { userId } = await this.jwt.verify(token);
      const user = await User.current(userId);
      reply.send(user);
    } catch (error) {
      reply.status(400).send(error);
    }
  }

  async update(request, reply) {
    try {
      const user = await User.update(request);
      reply.status(201).send(user);
    } catch (error) {
      reply.status(400).send(error);
    }
  }

  async delete(request, reply) {
    try {
      const token = request.cookies["api-auth"];
      const { userId } = await this.jwt.verify(token);
      await User.delete(userId);
      await UserToken.invalidate(userId);
      reply.status(200).send();
    } catch (error) {
      reply.status(400).send(error);
    }
  }
}
