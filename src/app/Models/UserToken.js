"use strict";

import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

userTokenSchema.statics.register = async function ({ userId, token }) {
  /**
   * we only want one token for each user
   * a previus user token will be invalidated here
   */
  await this.invalidate(userId);

  const userToken = new this({ userId, token });
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
