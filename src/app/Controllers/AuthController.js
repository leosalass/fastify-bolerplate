"use strict";

import User from "../Models/User.js";
import UserToken from "../Models/UserToken.js";

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
        userId: response.user.id,
        email: response.user.email,
      });

      await UserToken.register({ userId: response.user.id, token, expiresIn: `${this.env.INACTIVITY_TIME}m` })

      // Return JWT token to client
      reply.setCookie('api-auth', token, {
        secure: false,
        httpOnly: true,
        maxAge: this.env.INACTIVITY_TIME * 60

      }).status(200).send({ message: 'Logged in successfully!' });
    } catch (error) {
      reply.status(400).send(error);
    }
  }

  async logout(request, reply) {
    try {
      const token = request.cookies["api-auth"];
      const { userId } = await this.jwt.verify(token);
      await UserToken.invalidate(userId);
      reply.status(200).send();
    } catch (error) {
      reply.status(400).send(error);
    }
  }

  async updatePassword(request, reply) {
    try {
      const token = request.cookies["api-auth"];
      const { userId } = await this.jwt.verify(token);
      const { oldPassword, newPassword } = request.body;
      await User.updatePassword(userId, oldPassword, newPassword);
    } catch (error) {
      reply.status(401).send(error);
    }
  }

  async keepAlive(request, reply) {
    reply.status(200).send();
  }
}
