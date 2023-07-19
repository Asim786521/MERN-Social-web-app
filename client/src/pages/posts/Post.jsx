import React   from 'react'
import Navbar from '../../components/Navbar'
import "./Post.css";
 
 import { useState,useEffect } from 'react';
 import axios from 'axios'
 import {   useNavigate } from 'react-router-dom';
const Post = () => {
  const navigate=useNavigate()

    const[profileImage,SetProfileImage]=useState([])
    const[saved,postSaved]=useState({})

 
       const[file,setFiles]=useState(null)
       const [title,setTitle]=useState('') 
       
    //
    useEffect(()=>{

      axios.get('http://localhost:4000/posts/get-postData').then((response)=>{
 
 
SetProfileImage(response.data)
 
      }).catch((err)=>console.log(err))
         
  
    },[])
      
    
    const handleFileInput = (e) => {
      // handle validations
  
 
      setFiles(e.target.files[0]) 
  }
  const handleChange = (event) => { 
 setTitle(event.target.value)
     
  };


  const handleSubmit=(e)=>{
      e.preventDefault();
 
 

      const fd=new FormData()
      fd.append('file',file,)
     fd.append('title',title)

      try{
     const URL='http://localhost:4000/posts/add-post'

     axios.post(URL,fd,{headers: {
      "Content-type": "multipart/form-date",
  } }
     
       ).then(res=>console.log(res.data))
        navigate('/posts')
      }catch(err){
console.log(err);
      }
  }
  const savedPost=async(data)=>{
   
      postSaved(data)
   const savedPostdata={
        userId:data._id,
         title:data.name,
         Image:data.image
    }

    try{
      const response= await axios.put('http://localhost:4000/posts/saved-post',{savedPostdata})
      console.log("post saved",response.data);


    } catch (err) {
      console.log(err);
    }
  };
  
  return (
   <div>
    <Navbar/>  

  

     
    <div className="box">
 <a className="button" href="#popup1">   <label class="upload-area">
     
    
     
     <span className="upload-button">
       <i className="fas fa-arrow-up"></i>
     </span>
   </label></a>
</div>

<div id="popup1" className="overlay">
	<div className="popup">
		 
	 
		<div className="content">
    <h4>post title</h4>
		 <input type='text' name='title' value={title}  onChange={handleChange}/>
     <label>select</label>
     <input type="file" name="file" onChange={handleFileInput} />
     {file? (<button type="submit" onClick={handleSubmit}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>):("")}
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
 
    {profileImage && 
    profileImage.map((obj,index)=>(


    <div className="post" key={obj._id}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
        {/* {profileImage.map((obj ,index)=>  */}
        <img
              className="postProfileImg"
              // src= {obj.profilePicture}
              alt=""
            />
          {/* //)} */}
           

            <span className="postUsername"> 
             {obj.name} 
            </span>
            <span className="postDate"> </span>
          </div>
          <div className="postTopRight">
          today
          </div>
        </div>
        <div className="postCenter">
          <span className="postText"> </span>
          <img className="postImg" src={`http://localhost:4000/Images/${obj.image}`} alt="" />
          <p style={{fontSize:'55px'}}>{obj.name}</p>
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
    <div className="postSave">
    {saved? (<button   type="button" className="btn btn-outline-info  ml-auto"  onClick={() => savedPost({...obj})}>
      <span className="float-right"> <i class="fas fa-save"></i></span></button>):<h1 style={{fontWeight:'bold'}}>saved</h1>}
      </div>
  
          </div>
    ))} 
 
    
   
 
 </div>
   
 

   
   
  )
}

export default Post