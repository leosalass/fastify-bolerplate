"use strict";

import User from "../Models/User.js";

export class AuthController {

  constructor(jwt) {
    this.jwt = jwt;
  }

  async register(request, reply) {
    try {
      const user = await User.register(request.body);
      reply.status(201).send(user);
    } catch (error) {
      reply.status(400).send(error);
    }
  }

  async login(request, reply) {
    try {
      const response = await User.login(request.body);

      if (!response.authenticate) {
        reply.status(401).send({
          error: "Invalid credentials",
        });
        return;
      }

      // Generate JWT token
      const token = this.jwt.sign({
        email: response.user.email,
        name: response.user.name,
      });

      /**
       * TODO: store the token with an active status
       */

      // Return JWT token to client
      reply.setCookie('api-auth', token, {
        secure: false,
        httpOnly: true,
        maxAge: 3600,//1 hour
      }).status(201).send({ message: 'Logged in successfully!' });
      //reply.status(201).send({ token });
    } catch (error) {
      reply.status(400).send(error);
    }
  }
}
