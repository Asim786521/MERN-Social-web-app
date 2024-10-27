const { object, string, date, boolean } = require('joi');
const { ObjectId } = require('mongodb');
const mongoose=require('mongoose')

// const postSchema=new mongoose.Schema( { ---------------->OLD SCHEMA
//   createdAt:String,
//   userId:Object,
//   userName:String,
//   name:String,
//   image: String,
//   comments:{type:Array,default:[], },
//   likes: {
//     type: Array,
//     default: [],
//   },
 
// })

  
const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

 

const savedpostSchema= new mongoose.Schema({ 

  postId:ObjectId,
  title:String,
  Image:String,
  createdAt: { type: Date, default: Date.now }
 
})

const likedpostSchema= new mongoose.Schema({
  likedpostId:ObjectId,
  title:String,
  Image:String,
  likedStatus:Boolean,
  createdAt: { type: Date, default: Date.now }
})
 



 const postData =mongoose.model("posts",postSchema)

const savedPost = mongoose.model('savedposts', savedpostSchema);
const likedPost = mongoose.model('likedposts', likedpostSchema);

 module.exports={
  postData,savedPost,likedPost
 }