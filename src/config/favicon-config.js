'use strict';

import favicon from 'fastify-favicon';

export function set(app) {
    app.register(favicon, { path: app.helpers.directory.PUBLIC, name: 'favicon.ico', maxAge: 3600 })
}