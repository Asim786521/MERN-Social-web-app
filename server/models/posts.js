const mongoose=require('mongoose')

 
  
const postSchema=mongoose.Schema({
    
    
 
 file:[
 
  // {name: { type: String, required: true }},
  { type:Object
  }],
     
 
})

module.exports =mongoose.model("posts",postSchema)