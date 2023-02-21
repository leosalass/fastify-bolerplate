"use strict";

export default class AuthHook {
  validateSessionCookie(request, reply, next) {
    // Use Fastify's match function to check if the request URL matches

    /**
     * *exclude all routes starting with api/v1/auth
     */
    const authRoutesPattern = /^\/?(api\/v1\/auth\/)(.*)$/i;
    if (authRoutesPattern.test(request.url)) {
      //console.log("public:", request.method, request.url);
      return next();
    }

    const token = request.cookies["api-auth"];
    if (!token) {
      reply.status(401).send("Unauthorized");
      return;
    }

    // Verify JWT token
    if (this.jwt.verify(token)) {
      /**
       * TODO: validate the black list tokens here
       */
      //console.log("auth:", request.method, request.url);
      next();
    }
  }
}
