

const express=require('express')

const cors=require('cors')
const mongoose=require('mongoose')
const postRouter=require('./routes/post')
const app=express();
const fileUpload=require('express-fileupload')

const PORT=4000
app.use(express());
app.use(cors())
 app.use(express.static('public'))
 
app.use('/posts',postRouter);
 
 

 

 

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
  mongodb://127.0.0.1:27017/react-jwt

mongoose.connect('mongodb://127.0.0.1:27017/Mern-SocialApp')
  .then(() => console.log('Connected!'));

  
      
  module.exports=app