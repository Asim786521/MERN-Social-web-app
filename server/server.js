
require("dotenv").config();
const express=require('express')

const cors=require('cors')
const mongoose=require('mongoose')
 
const postRouter=require('./routes/post')
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const app=express();
 
const bodyparser=require('body-parser')

const PORT=4000
app.use(express());
app.use(cors())
 app.use(express.static('public'))
 app.use(bodyparser.json())
 
app.use('/posts',postRouter);
app.use("/user", userRoutes);
 
app.use("/auth", authRoutes);

app.use(app.route);
 

 

 

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
  

mongoose.connect('mongodb://127.0.0.1:27017/Mern-SocialApp')
  .then(() => console.log('Connected!'));

  
      
  module.exports=app