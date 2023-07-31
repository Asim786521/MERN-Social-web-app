const { object, string, date } = require('joi');
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
 



 const postData =mongoose.model("posts",postSchema)

const savedPost = mongoose.model('savedposts', savedpostSchema);

 module.exports={
  postData,savedPost
 }