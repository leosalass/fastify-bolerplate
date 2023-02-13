'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

/**
 * The pre hook is used to hash the password before saving the user to the database.
 */
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.statics.createUser = async function(userData) {
  const user = new this(userData);
  await user.save();
  return user;
};

userSchema.statics.getUsers = async function() {
  const users = await this.find({});
  return users;
};

userSchema.statics.updateUser = async function(userData) {
  const users = await this.findOneAndUpdate({ email: userData.email }, userData, { new: true });
  return users;
};

userSchema.statics.deleteUser = async function(email) {
  return await this.deleteOne({ email: email });
};

const User = mongoose.model("User", userSchema);

export default User;
