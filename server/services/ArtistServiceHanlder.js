// services/listService.js
const List = require('../models/artists');

module.exports = {
  getAllLists: async () => {
    try {
      const lists = await List.find();
      return lists;
    } catch (err) {
      throw new Error('Error fetching lists');
    }
  }
};
