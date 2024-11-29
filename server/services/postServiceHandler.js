const postModel = require("../models/posts.js");
const { User } = require("../models/user");
const { ObjectId } = require("mongodb");
const { post } = require("../routes/post.js");
const { default: mongoose } = require("mongoose");
 
const postService = {
 
  getAllPosts: async () => {
    try {
      const allPosts = await postModel.postData.find();
      return { success: true, posts: allPosts };
    } catch (error) {
      console.error(error);
      return { error: "Failed to retrieve posts" };
    }
  },
  

  getPostById:async(id)=>{
    try{

      if(!mongoose.Types.ObjectId.isValid(id)){
        return {error:"invalid id"}
      }
      const findPost=await postModel.postData.findById(id);
 
      if(!findPost){
  
     
      return {error:"no post found with id"}
      }else{
        return {status:200, post:findPost}
      }
    }catch(errr){
      return { error: errr.message }
    }
  },
  
  uploadPost: async (postData, file) => {
    try {
      const newPost = new postModel.postData({
        title: postData.title,
        content: postData.content,
        image: file ? file.path : null,  
      });

      await newPost.save();
      return { success: true, message: "Post uploaded successfully", post: newPost };
    } catch (error) {
      console.error(error);
      return { error: "Failed to upload post" };
    }
  },

  // Save post function
  savePost: async (savePostData,userID) => {
    try {
      const savedPost = await postModel.savedPost.create({
        postId: new ObjectId(savePostData.userId),
        userid:new ObjectId(userID),
        title: savePostData.title,
        image: savePostData.Image,
      });

      return { success: true, message: "Post saved", post: savedPost };
    } catch (error) {
      console.error(error);
      return { error: "Failed to save post" };
    }
  },

  // Like post function
  likePost: async (likePostData) => {
    try {
      const likedPost = await postModel.likedPost.create({
        likedpostId: new ObjectId(likePostData.userId),
        title: likePostData.title,
        image: likePostData.Image,
        likedStatus: likePostData.liked,
      });

      return { success: true, message: "Post liked", post: likedPost };
    } catch (error) {
      console.error(error);
      return { error: "Failed to like post" };
    }
  },

  
  addComment: async (commentData) => {
    try {
      const post = await postModel.postData.findById(commentData.postId);
      if (!post) {
        return { error: "Post not found" };
      }

      await post.updateOne({
        $push: {
          comments: {
            commentedpostId: commentData.postId,
            commentedUserId: commentData.commentedUserId,
            commentedUserName: commentData.userName,
            comment: commentData.comment,
          },
        },
      });

      return { success: true, message: "Comment added", postId: commentData.postId };
    } catch (error) {
      console.error(error);
      return { error: "Failed to add comment" };
    }
  },

 
  deleteComment: async (commentData) => {
    try {
      const post = await postModel.postData.findById(commentData.commentedpostId);
      if (!post) {
        return { error: "Post not found" };
      }

      await post.updateOne({
        $pull: {
          comments: {
            commentedUserId: commentData.commentedUserId,
            comment: commentData.comment,
          },
        },
      });

      return { success: true, message: "Comment deleted" };
    } catch (error) {
      console.error(error);
      return { error: "Failed to delete comment" };
    }
  },

 
  searchPost: async (postName) => {
    try {
      const foundPost = await postModel.postData.findOne({
        title: new RegExp(postName, "i"),  
      });

      if (!foundPost) {
        return { error: "Post not found" };
      }

      return { success: true, post: foundPost };
    } catch (error) {
      console.error(error);
      return { error: "Failed to search post" };
    }
  },
 
  getAllSavedPosts: async () => {
    try {
      const savedPosts = await postModel.savedPost.find();
      return { success: true, posts: savedPosts };
    } catch (error) {
      console.error(error);
      return { error: "Failed to retrieve saved posts" };
    }
  },

 
  getAllLikedPosts: async () => {
    try {
      const likedPosts = await postModel.likedPost.find();
      return { success: true, posts: likedPosts };
    } catch (error) {
      console.error(error);
      return { error: "Failed to retrieve liked posts" };
    }
  },
};

 
module.exports = postService;
