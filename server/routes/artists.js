const express = require("express");
const ArtistServiceHanlder = require("../services/ArtistServiceHanlder");

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const lists = await ArtistServiceHanlder.getAllLists();
    res.json(lists);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
