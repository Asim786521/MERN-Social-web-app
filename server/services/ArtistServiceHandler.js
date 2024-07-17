// services/listService.js
const { List, artistData } = require("../models/artists");

module.exports = {
  getAllLists: async () => {
    try {
      const lists = await artistData.find();
      return lists;
    } catch (err) {
      throw new Error("Error fetching lists");
    }
  },

  addArtist: async (artistOBj) => {
    try {
      let findArtist = await artistData.findOne({ phone: artistOBj.phone ,UserType:artistOBj.UserType});
      if (!findArtist) {
        const artistRes = await artistData.create(artistOBj);
        return artistRes;
      } else {
        return { error: "User already exists" };
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
