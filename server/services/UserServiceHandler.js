// services/userService.js

const { User } = require("../models/user");
const bcrypt = require("bcrypt");

const userServiceHandler = {
  findUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  createUser: async (userData) => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(userData.password, salt);
    const newUser = new User({ ...userData, password: hashPassword });
    await newUser.save();
    return newUser;
  },

  updateProfileImage: async (userId, filename) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await user.updateOne({ $set: { profileImage: filename } });
    return user;
  }
};

module.exports = userServiceHandler;
