const { log } = require('console')
const express=require('express')
const path=require('path')
 const postModel=require('../models/posts.js')
const multer = require('multer')
const { title } = require('process')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/')
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
    
 

    
 
 
 
        
     try{
        if(req.file){
              console.log(req.file)
      return res.status(200).json({ status: 'uploaded', });
        }
         
     } catch{
        return res.status(500).send('err');
     }
   
   
   
   

   
}),

route.get("/get-postData",async(req,res)=>{
   const getPosts=await postModel.findOne({})
   //console.log('getPosts',getPosts.file[1])
   res.status(201).json({data:getPosts})
})

module.exports = route ;