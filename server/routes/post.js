const express = require("express");
const {
  gellAll,
  AddPost,
  getPostData,
  SavedPost,
  getAllSavedpost,
  LikedPost,
  getAllLikedPost,
  findLikedPostwithId,
  updateComment,
  deleteComment,
  PostSearch,
} = require("../controller/PostController.js");

const route = express.Router();

route.get("/", gellAll);
route.post("/add-post", AddPost);
route.get("/get-postData", getPostData);
route.put("/saved-post", SavedPost);
route.get("/posts-saved", getAllSavedpost);
route.put("/liked-post", LikedPost);
route.get("/liked-post", getAllLikedPost);
route.put("/like/:id", findLikedPostwithId);
route.put("/post-comment", updateComment);
route.put("/delete-comment", deleteComment);
route.get("/post-search", PostSearch);

module.exports = route;
