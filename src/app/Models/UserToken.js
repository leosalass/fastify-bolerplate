"use strict";

import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    token: { type: String, required: true },
    expiresIn: { type: String, required: true },
  },
  { timestamps: true }
);

/**
 * *We only will store one active token for each user
 * the reason is i do not want to have many tokens in the db,
 * maybe you want to keep the tokens history, its you call
 * also you could want to enable more than one active token by user,
 * But i dont have that requirement for this basic boilerplate
 */
userTokenSchema.statics.register = async function ({
  userId,
  token,
  expiresIn,
}) {
  /**
   * we only want one token for each user
   * a previus user token will be invalidated here
   */
  await this.invalidate(userId);

  const userToken = new this({ userId, token, expiresIn });
  await userToken.save();

  return userToken;
};

userTokenSchema.statics.validate = async function (userId, token) {
  const currentToken = await this.findOne({ userId, token });
  return currentToken;
};

userTokenSchema.statics.invalidate = async function (userId) {
  const currentToken = await this.findOne({ userId });
  if (currentToken) {
    await currentToken.delete();
  }
};

const UserToken = mongoose.model("UserToken", userTokenSchema);

export default UserToken;
