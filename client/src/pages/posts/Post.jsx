import React   from 'react'
import Navbar from '../../components/Navbar'
import "./Post.css";
import { Users } from "../../dummyData";
 import { useState,useEffect } from 'react';
 import axios from 'axios'
const Post = () => {
  

    const[profileImage,SetProfileImage]=useState([{}])


       const[file,setFiles]=useState(null)
       const [title,setTitle]=useState('') 
       
    //
    useEffect(()=>{

      axios.get('http://localhost:4000/posts/get-postData').then((response)=>{
   console.log(" post data received",response.data.data.file);
   

      })
        if(Users!==null){
   SetProfileImage(Users)
    console.log( "data is",profileImage)

    profileImage.map((obj,index)=>(
      console.log("profilename",obj)
    ))
        }
  //   const URL='http://localhost:3000/posts'

  //  try{
  //       axios.post(URL).then((response)=>{
  //         console.log("data fetched ",response.data)
  //       });
  //     } 
  //       catch(error)  {
  //         if( error.response ){
  //             console.log(error.response.data); // => the response payload 
  //         }
  //       };
    },[])
      
    
    const handleFileInput = (e) => {
      // handle validations
      console.log(e.target.value);
      console.log("event",e.target.files[0]);
      setFiles(e.target.files[0]) 
  }
  const handleChange = (event) => {
 console.log('event name',event.target.value)
 setTitle(event.target.value)
     
  };


  const handleSubmit=(e)=>{
      e.preventDefault();
 
      console.log("file is",file);
      console.log("name is",title);

      const fd=new FormData()
      fd.append('file',file,)
     fd.append('title',title)

      try{
     const URL='http://localhost:4000/posts/add-post'

     axios.post(URL,fd,{headers: {
      "Content-type": "multipart/form-date",
  } }
     
       ).then(res=>console.log(res.data))
     
      }catch(err){
console.log(err);
      }
  }
 
  return (
   <div>
    <Navbar/>  
   
    <div class="box">
 <a class="button" href="#popup1">   <label class="upload-area">
     
    
     
     <span class="upload-button">
       <i class="fas fa-arrow-up"></i>
     </span>
   </label></a>
</div>

<div id="popup1" class="overlay">
	<div class="popup">
		 
	 
		<div class="content">
    <h4>post title</h4>
		 <input type='text' name='title' value={title}  onChange={handleChange}/>
     <label>select</label>
     <input type="file" name="file" onChange={handleFileInput} />
     {file? (<button type="submit" onClick={handleSubmit}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>):("")}
		</div>
	</div>
</div>
 
    {/* <div class="upload">
   
  <label class="upload-area">
     
    
    <input type="file" name="file" onChange={handleFileInput} />
    <span class="upload-button">
      <i class="fas fa-arrow-up"></i>
    </span>
  </label>
 
 {file? (<button type="submit" onClick={handleSubmit}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>):("")}
 
</div> */}
 
    {profileImage.map((obj,index)=>(


    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
        {/* {profileImage.map((obj ,index)=>  */}
        <img
              className="postProfileImg"
              src= {obj.profilePicture}
              alt=""
            />
          {/* //)} */}
           

            <span className="postUsername"> 
             {obj.username}
            </span>
            <span className="postDate"> </span>
          </div>
          <div className="postTopRight">
          today
          </div>
        </div>
        <div className="postCenter">
          <span className="postText"> </span>
          <img className="postImg" src="assets/psd4.jpg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png"   alt="" />
            <img className="likeIcon" src="assets/heart.png"   alt="" />
            <span className="postLikeCounter">  people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">  comments</span>
          </div>
        </div>
      </div>
    </div>
    ))}
     
   
      </div>

   
   
  )
}

export default Post