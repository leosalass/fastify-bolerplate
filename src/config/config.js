"use strict";

import * as Helper from "../helpers/helpers.js";
import * as Cors from "./cors-config.js";
import * as Favicon from "./favicon-config.js";

export function set(app, env) {
  Helper.set(app, env);
  Cors.set(app);
  Favicon.set(app);
}
