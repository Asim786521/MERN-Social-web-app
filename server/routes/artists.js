const route = require("express").Router();
const { getAllArtists } = require("../controller/ArtistController");
const ArtistServiceHandler = require("../services/ArtistServiceHandler");

route.get("/all", getAllArtists);
route.post("/add-artist", ArtistServiceHandler.addArtist);

module.exports = route;
