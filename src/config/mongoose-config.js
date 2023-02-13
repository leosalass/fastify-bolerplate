"use strict";

import * as mongoose from "mongoose";

mongoose.set("strictQuery", true);

export function set(app) {
  app.register(async (instance) => {

    let connectionString;
    if (
      app.env.MONGO_DB_HOST_NAME &&
      app.env.MONGO_DB_PORT &&
      app.env.MONGO_DB_NAME
    ) {
      connectionString =
        app.env.MONGO_DB_USER && app.env.MONGO_DB_PASSWORD
          ? `mongodb://${app.env.MONGO_DB_USER}:${app.env.MONGO_DB_PASSWORD}@${app.env.MONGO_DB_HOST}:${app.env.MONGO_DB_PORT}/${app.env.MONGO_DB_NAME}`
          : `mongodb://${app.env.MONGO_DB_HOST}:${app.env.MONGO_DB_PORT}/${app.env.MONGO_DB_NAME}`;
    } else {
      connectionString = `mongodb+srv://${app.env.ATLAS_USER}:${app.env.ATLAS_PASSWORD}@${app.env.ATLAS_CLUSTER}/${app.env.ATLAS_DB_NAME}?${app.env.ATLAS_OPTIONS}`;
    }

    try {
      instance.mongoose = await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }catch(e){
        app.log.error(e);
    }
  });
}
