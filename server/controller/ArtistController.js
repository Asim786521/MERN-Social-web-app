const ArtistServiceHandler = require("../services/ArtistServiceHandler");

const getAllArtists = async (req, res) => {
  try {
    const lists = await ArtistServiceHandler.getAllLists();
    res.json(lists);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const addArtist = async (req, res) => {
  try {
    const addedResponse = await ArtistServiceHandler.addArtist(req.body);
    if (addedResponse.error) {
      res.status(400).send({ error: addedResponse.error });
    } else {
      return res.status(201).send(addedResponse);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getAllArtists,
  addArtist,
};
