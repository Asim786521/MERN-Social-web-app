

const route = require("express").Router();
 const ArtistServiceHandler = require("../services/ArtistServiceHandler");

route.get("/all", async (req, res) => {
  try {
    const lists = await ArtistServiceHandler.getAllLists();
    res.json(lists);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


module.exports=route;