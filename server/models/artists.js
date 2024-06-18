// models/listModel.js
const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

var artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  UserType: { type: String },
});

const list = mongoose.model("List", listSchema);

const artistData = mongoose.model("artists", artistSchema);

module.exports = { list, artistData };
