const route = require("express").Router();
const { getAllArtists,addArtist } = require("../controller/ArtistController");
const auth = require("../middleware/auth");


route.get("/get/all",auth, getAllArtists);
route.post("/add",auth, addArtist);

module.exports = route;
