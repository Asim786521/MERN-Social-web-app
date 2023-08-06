import React   from 'react'
import Navbar from '../../pages/Navbar/Navbar'
import "./Post.css";
import { useState,useEffect } from 'react';
import axios from 'axios'
import {   useNavigate } from 'react-router-dom';
import Heart from "react-animated-heart";
import Uploadpost from './Uploadpost';
import PostComments from './PostComments';
const Post = () => {

   
    const navigate=useNavigate()
    const[postItems,SetPostItems]=useState([])
     const[saved,postSaved]=useState('')
     const[liked,postliked]=useState()
     const[likedStatusCheck,setLikedStatusCheck]=useState([])
     const [toggle, setToggle] = useState(true)
     const userId=localStorage.getItem("user_Id")
          
    useEffect(()=>{

      axios.get('http://localhost:4000/posts/get-postData').then((response)=>{
 
 SetPostItems(response.data) }).catch((err)=>console.log(err));

      axios.get('http://localhost:4000/posts/liked-post').then((response)=>{
         console.log("liked post",response.data);
         setLikedStatusCheck(response.data)
    }).catch((err)=>console.log(err));
      
   },
  
    [])
      
  const savedPost=async(data)=>{
 
   const savedPostdata={
        userId:data._id,
         title:data.name,
         Image:data.image
    }
    try{
      const response= await axios.put('http://localhost:4000/posts/saved-post',{savedPostdata})
      
      if(response.data._id){ 
         postSaved(response.data._id)
         }else{
        alert(response.data.response)
      } 
      } catch (err) {
      console.log(err);
    }

  };
  const likedPost=async(data)=>{
      
    const likedPostdata={
      userId:data._id,
       title:data.name,
       Image:data.image,
       liked:true
  }
   try{
    const response= await axios.put('http://localhost:4000/posts/liked-post',{likedPostdata})
    if(response.data._id){ 
    postliked(response.data._id)
    }else{
      alert(response.data.response)
   } } catch (err) {
      console.log(err);
}
}
  return (
   <div>
    <Navbar/>  

<div class="post-container">
   
 <Uploadpost/>
 
 {postItems && 
    postItems.map((obj,index)=>(
      
 <div className="post" key={obj._id}> 
   <div className="postWrapper">
     <div className="postTop">
        <div className="postTopLeft">
        <img className="postProfileImg" alt=""/>
        <span className="postUsername"> 
             {userId && userId===obj.userId?(<p>You</p>):obj.userName} 
            </span>
            <span className="postDate"> </span>
          </div>
          <div className="postTopRight">
        {obj.createdAt}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText"> </span>
          <img className="postImg" src={`http://localhost:4000/Images/${obj.image}`} alt="" />
          <p style={{fontSize:'55px'}}>{obj.name}</p>
        </div>   
        <div className="postBottom">
           <div className="postBottomRight">
          {  liked===obj._id?(<span className="postCommentText"> </span>):""} 
        </div>
      </div>
      </div>
  
{ liked===obj._id?( <p style={{color:'#f52439'}}>already liked</p>):  <i className="like-icon"  onClick={() => likedPost({...obj})}     ></i>  }

<div className="postSave">

   {likedStatusCheck.filter(status => status.likedStatus===true && status.likedpostId===obj._id).map((likeobj)=>(
<div key={index}>
    <p style={{color: "#f52439",}}>you liked!!!<Heart isClick={toggle} onClick={() => setToggle(!toggle)} /></p>
  
    </div>))}

   {likedStatusCheck.map((likeobj,index)=>(
        <div key={likeobj.likedpostId}>  
     { likeobj.likedpostId && likeobj.likedStatus===null && likeobj.likedpostId!==obj._id? (<p style={{color: "#f52439",}}>you bot liked!!!<Heart isClick={toggle} onClick={() => setToggle(!toggle)} /></p>):"" }
    </div> ))}      
 
  <div style={{marginLeft:"9rem"}}> 
  {saved && saved===obj._id? (<p className='text-primary'>already saved</p>):<button   type="button" className="btn btn-outline-info  ml-auto" style={{fontSize:"23px"}} onClick={() => savedPost({...obj})}>
  <span className="float-right"> <i class="fas fa-save"></i></span></button>}
 </div>
</div>

 <PostComments  index={index}  _id={obj._id}  commentArray={obj.comments}/>
  </div>
    ))} 
 </div>
   </div>
   
   )
}

export default Post