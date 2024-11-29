const route = require("express").Router();
const { getAllArtists,addArtist } = require("../controller/ArtistController");
const auth = require("../middleware/auth");


route.get("/get/all",auth.userAuthentication, getAllArtists);
route.post("/add",auth.userAuthentication, addArtist);

module.exports = route;
