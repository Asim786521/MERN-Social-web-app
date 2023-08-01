const { object, string, date, boolean } = require('joi');
const { ObjectId } = require('mongodb');
const mongoose=require('mongoose')


  
const postSchema=mongoose.Schema( {
  createdAt:String,
  userId:Object,
  userName:String,
  name:String,
  image: String,
 
})

const savedpostSchema=mongoose.Schema({ 

  postId:ObjectId,
  title:String,
  Image:String,
 
})

const likedpostSchema=mongoose.Schema({
  likedpostId:ObjectId,
  title:String,
  Image:String,
  likedStatus:Boolean
})
 



 const postData =mongoose.model("posts",postSchema)

const savedPost = mongoose.model('savedposts', savedpostSchema);
const likedPost = mongoose.model('likedposts', likedpostSchema);

 module.exports={
  postData,savedPost,likedPost
 }