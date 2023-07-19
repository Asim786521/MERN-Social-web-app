const mongoose=require('mongoose')

 
  
const postSchema=mongoose.Schema( {
  name:String,
  image: String,
 
})

const savedpostSchema=mongoose.Schema({ 
  userid:Object,
  title:String,
  Image:String,
 
})
 



 const postData =mongoose.model("posts",postSchema)

const savedPost = mongoose.model('savedposts', savedpostSchema);

 module.exports={
  postData,savedPost
 }