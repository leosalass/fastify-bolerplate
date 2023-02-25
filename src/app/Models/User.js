"use strict";

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

/**
 * The pre hook is used to hash the password before saving the user to the database.
 */
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

/**
 * The pre hook is used to hash the password before updating the user to the database.
 */
userSchema.pre("findOneAndUpdate", async function (next) {
  const user = this.getUpdate();

  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.statics.login = async function (userData) {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  let response = {
    authenticate: false,
  };

  if (!user) return response;

  // Compare password with hashed password from database
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return response;
  }

  response.authenticate = true;
  response.user = {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
  };

  return response;
};

userSchema.statics.register = async function (userData) {
  const user = new this(userData);
  await user.save();
  return user;
};

userSchema.statics.list = async function () {
  const users = await this.find({});
  return users;
};

userSchema.statics.updatePassword = async function (
  userId,
  oldPassword,
  newPassword
) {
  const user = await this.findById(userId);

  //oldPassword = bcrypt.hash(oldPassword, 10)
  console.log({ userId, oldPassword, password: user.password });

  // Compare password with hashed password from database
  const isValid = await bcrypt.compare(oldPassword, user.password);
  console.log({ isValid });
  if (!isValid) throw new Error();

  user.password = newPassword;
  await user.save();

  return user;
};

userSchema.statics.update = async function (request) {
  const { username } = request.body;
  const user = await this.findOneAndUpdate(
    { email: request.user.email },
    { username },
    { new: true }
  );
  return user;
};

userSchema.statics.delete = async function (userId) {
  const user = await this.findById(userId);
  user.delete();
};

const User = mongoose.model("User", userSchema);

export default User;
