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
    
//   const postData=new postModel({
//  file:[{
//     name:'asim',
    
//     file:req.file
//  }
 
//  ]


    
// })
 
// //     // 
// //     //
   
//         const result=await postData.save()
//      console.log("post data is",result);
    
    //  const doc = await postModel.findOne({ _id: "64b4cd520663d23abed95bce" })
    //  console.log("doc",doc);


     var user_id = '64b55bb5df78daf44c12f8cd';
//     64b4f18966765db55e8efedd
//     console.log("file data is",filedata)
// const upd=await  postModel.findByIdAndUpdate(user_id, { file:req.file }) 

if(user_id!==''){
//   const upd= await postModel.updateOne({ _id: user_id }, { $push: { name:  req.body.title } })
//   const upd1= await postModel.updateOne({ _id: user_id }, { $push: { file:req.file } })
  const upd=await postModel.updateOne({ _id: user_id}, { $push:{ file:  {$each: [{name:req.body.title},req.file] } } })      
 
  console.log("updated",upd);
  //console.log("updated",upd1);
}
// }else{
//     const postData=new postModel({
//  file:[{
//     name:req.body.title,
    
//     file:req.file
//  }
 
//  ]


    
// })
 
//     // 
//     //
   
//         const result=await postData.save()
//      console.log("post data is",result);
// }
 
        
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