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
  getPostById,
} = require("../controller/PostController.js");
const auth = require("../middleware/auth.js");

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
route.post("/product/view",auth,getPostById)


module.exports = route;
