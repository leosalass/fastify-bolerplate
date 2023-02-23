"use strict";

import UserToken from "../app/Models/UserToken.js";

export default class AuthHook {
  async validateSessionCookie(request, reply) {
    /**
     * Regular expression pattern to match any route inside
     * api/v1/auth/ or /api/v1/auth/, except for the logout
     */
    const authRoutesPattern = /^\/?(api\/v1\/auth\/(?!logout)[^\/]+)\/?$/i;
    if (authRoutesPattern.test(request.url)) {
      return;
    }

    const token = request.cookies["api-auth"];
    if (!token) {
      reply.status(401).send("Unauthorized");
      return;
    }

    // Decode the userId from the JWT
    const { userId } = this.jwt.verify(token);

    // Validate JWT
    if (!(await UserToken.validate(userId, token))) {
      reply.status(401).send("Unauthorized");
      return;
    }
  }
}
