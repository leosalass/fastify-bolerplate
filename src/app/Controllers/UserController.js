"use strict";

import User from "../Models/User.js";

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
      const token = request.jwtToekn;
      await User.delete(request.user.email);

      /**
       * TODO: black list this token, maybe we can just add all the new tokens to the db and then we could remove the tokens we want to balck list, in that case only existing tokens will pass the validation
       */

      reply.status(201).send({ message: "User successfully deleted" });
    } catch (error) {
      reply.status(400).send(error);
    }
  }
}
