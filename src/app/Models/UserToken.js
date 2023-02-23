"use strict";

import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

userTokenSchema.statics.register = async function ({ userId, token }) {
  const userToken = new this({ userId, token });
  await userToken.save();
  return userToken;
};

userTokenSchema.statics.delete = async function (userId) {
  return await this.deleteOne({ userId: userId }, function (err) {
    if (err) return handleError(err);
  });
};

const UserToken = mongoose.model("UserToken", userTokenSchema);

export default UserToken;
