"use strict";

import UserToken from "../app/Models/UserToken.js";

export default class AuthHook {
  async validateSessionCookie(request, reply) {
    /**
     * Regular expression pattern to match any route inside
     * api/v1/auth/ or /api/v1/auth/, except for the logout
     */
    const authRoutesPattern = /^\/?(api\/v1\/auth\/(?!logout|keep-alive)[^\/]+)\/?$/i;
    if (authRoutesPattern.test(request.url)) {
      return;
    }

    const token = request.cookies["api-auth"];
    if (!token) {
      reply.status(401).send("Unauthorized");
      return;
    }

    // Decode the userId from the JWT
    try {
      const { userId, email } = this.jwt.verify(token);

      // Validate JWT
      if (!(await UserToken.validate(userId, token))) {
        throw new Error();
      }

      const refreshedToken = this.jwt.sign({ userId, email });

      await UserToken.register({ userId, token: refreshedToken, expiresIn: `${this.env.INACTIVITY_TIME}m` })

      //refres the user token
      reply.setCookie('api-auth', refreshedToken, {
        secure: false,
        httpOnly: true,
        maxAge: this.env.INACTIVITY_TIME * 60
      });
    } catch (e) {
      console.log(e)
      reply.status(401).send("Unauthorized");
      return;
    }


  }
}
