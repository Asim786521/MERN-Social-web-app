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
  getAllLikedPostsController, 
  getPostByIdController
} = require("../controller/PostController");
const multer = require("multer");
const { userAuthentication } = require("../middleware/auth");
 

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

 
route.get("/", userAuthentication, getAllPostsController);  
route.post("/add-post", userAuthentication, upload.single("image"), addPostController);  
route.post("/save-post",userAuthentication, savePostController); 
route.post("/like-post",userAuthentication, likePostController); 
route.post("/add-comment",userAuthentication, addCommentController);  
route.post("/delete-comment",userAuthentication, deleteCommentController);  
route.get("/search", userAuthentication,searchPostController);  
route.get("/saved",  userAuthentication,getAllSavedPostsController);  
route.get("/liked", userAuthentication, getAllLikedPostsController); 
route.get("/get-post/:id", userAuthentication,getPostByIdController)


module.exports = route;
