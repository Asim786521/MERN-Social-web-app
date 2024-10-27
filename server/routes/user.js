// routes/userRoutes.js

const express = require("express");
const userController = require("../controller/UserController");
const multer = require("multer");

const route = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

route.post("/", userController.registerUser);  
route.post("/add-profileImage", upload.single('file'), userController.addProfileImage); // Add profile image

module.exports = route;
