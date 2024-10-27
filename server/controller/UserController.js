// controllers/UserController.js

const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const userService = require("../services/UserServiceHandler");

const UserController = {
  registerUser: async (req, res) => {
    try {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(409).send({ message: "User with given email already exists!" });
      }

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({ ...req.body, password: hashPassword }).save();
      return res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },

  addProfileImage: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body._id });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      await user.updateOne({ $set: { profileImage: req.file.filename } });
      const updatedProfile = await User.findOne({ _id: req.body._id });
      return res.status(200).send({ status: 'Profile updated', name: user.username, profileImage: updatedProfile.profileImage });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
};

module.exports = UserController;
