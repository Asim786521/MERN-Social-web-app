const { log } = require('console')
const express=require('express')
const path=require('path')
 const postModel=require('../models/posts.js')
 const { User } = require("../models/user");
const multer = require('multer')
const { title } = require('process')
const { loadavg } = require('os')
const { response } = require('../server.js')
  
 
const { ObjectId } = require('mongodb');
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
     
    const finduser=await User.findOne({_id:req.body._id})
    console.log("finduser"+finduser);
   
    var dates = new Date();
    const uploadedTime=dates.toDateString();
     const saveFile= await postModel.postData.create({createdAt:uploadedTime,userId:finduser._id,userName:finduser.username,name:req.body.title,image:req.file.filename})
      
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
    postModel.postData.find().then(user=>res.json(user));
   
   // console.log('getPosts',getPosts.file[1])
   
})
 


route.put('/saved-post',async(req,res)=>{
  
const savePostobject=req.body.savedPostdata
  
const savedataCheck=await postModel.savedPost.findOne({postId:new ObjectId(savePostobject.userId),title:savePostobject.title,Image:savePostobject.Image})
 
 
if(savedataCheck){
    return res.json({status:"error",message:"post already saved" ,_id:savedataCheck.postId})
}else{
    await postModel.savedPost.create({postId:new ObjectId(savePostobject.userId),title:savePostobject.title,Image:savePostobject.Image})
    return res.json({status:"success",response:"post saved"})
}
 
 
})

route.get('/posts-saved',(req,res)=>{
   postModel.savedPost.find().then(saved=>res.json(saved)).catch((err)=>console.log(err))
})


route.put('/liked-post',async(req,res)=>{
  
   const likedPostobject=req.body.likedPostdata
     
   const likeddataCheck=await postModel.likedPost.findOne({likedpostId:new ObjectId(likedPostobject.userId),title:likedPostobject.title,Image:likedPostobject.Image,likedStatus:likedPostobject.liked})
    
    
   if(likeddataCheck){
       return res.json({status:"error",message:"post already liked" ,_id:likeddataCheck.likedpostId})
   }else{
       await postModel.likedPost.create({likedpostId:new ObjectId(likedPostobject.userId),title:likedPostobject.title,Image:likedPostobject.Image,likedStatus:likedPostobject.liked})
       return res.json({status:"success",response:" post liked"})
   }
    
    
   })

module.exports = route ;