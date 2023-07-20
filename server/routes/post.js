const { log } = require('console')
const express=require('express')
const path=require('path')
 const postModel=require('../models/posts.js')
  
const multer = require('multer')
const { title } = require('process')
const { loadavg } = require('os')
const { response } = require('../server.js')
 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })
const route=express.Router()
 
 route.get('/',(req,res)=>{
    res.json('post home')
 })
route.post('/add-post',upload.single('file'), async(req,res)=>{ 
    console.log("title name is",req.body.title)
    
     const saveFile= await postModel.postData.create({name:req.body.title,image:req.file.filename})
      
  console.log(saveFile);

    
 
 
 
        
     try{
        if(req.file){
              console.log(req.file)
      return res.status(200).json({ status: 'uploaded', });
        }
         
     } catch{
        return res.status(500).send('err');
     }
   
   
   
   

   
}),

route.get("/get-postData", (req,res)=>{
    postModel.postData.find().then(user=>res.json(user))
   //console.log('getPosts',getPosts.file[1])
   
})


route.put('/saved-post',async(req,res)=>{
  
const savePostobject=req.body.savedPostdata 
const savedataCheck=await postModel.savedPost.findOne({title:savePostobject.title,Image:savePostobject.Image})
// console.log("saved data check is",savedataCheck);
if(savedataCheck){
    return res.json({status:"error",message:"post already saved" ,_id:savedataCheck._id})
}else{
    await postModel.savedPost.create(savePostobject)
}
 
 
})

route.get('/posts-saved',(req,res)=>{
   postModel.savedPost.find().then(saved=>res.json(saved)).catch((err)=>console.log(err))
})

module.exports = route ;