const express = require("express");
const { 
  getAllPostsController,
  addPostController,
  savePostController,
  likePostController,
  addCommentController,
  deleteCommentController,
  searchPostController,
  getAllSavedPostsController,
  getAllLikedPostsController 
} = require("../controller/PostController");
const multer = require("multer");

const route = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Routes
route.get("/", getAllPostsController);  
route.post("/add-post", upload.single("image"), addPostController);  
route.post("/save-post", savePostController); 
route.post("/like-post", likePostController); 
route.post("/add-comment", addCommentController);  
route.post("/delete-comment", deleteCommentController);  
route.get("/search", searchPostController);  
route.get("/saved", getAllSavedPostsController);  
route.get("/liked", getAllLikedPostsController); 

module.exports = route;
