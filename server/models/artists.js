// models/listModel.js
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('List', listSchema);
