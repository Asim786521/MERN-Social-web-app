const { object, string, date, boolean } = require('joi');
const { ObjectId } = require('mongodb');
const mongoose=require('mongoose')


  
const postSchema=new mongoose.Schema( {
  createdAt:String,
  userId:Object,
  userName:String,
  name:String,
  image: String,
  comments:{type:Array,default:[], },
  likes: {
    type: Array,
    default: [],
  },
 
})

const savedpostSchema= new mongoose.Schema({ 

  postId:ObjectId,
  title:String,
  Image:String,
 
})

const likedpostSchema= new mongoose.Schema({
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