import React   from 'react'
import Navbar from '../../components/Navbar'
import "./Post.css";
import { Users } from "../../dummyData";
 import { useState,useEffect } from 'react';
 import axios from 'axios'
const Post = () => {
    const[Username,Setusername]= useState([''])

    const[profileImage,SetProfileImage]=useState([{}])
 
       
    //
    useEffect(()=>{
        if(Users!==null){
   SetProfileImage(Users)
    console.log( "data is",profileImage)

    profileImage.map((obj,index)=>(
      console.log("profilename",obj)
    ))
        }
    const URL='http://localhost:3000/posts'

   try{
        axios.post(URL).then((response)=>{
          console.log("data fetched ",response.data)
        });
      } 
        catch(error)  {
          if( error.response ){
              console.log(error.response.data); // => the response payload 
          }
        };
    },[])
      
    
  
  
    
    
   
 
  return (
   <div>
    <Navbar/>


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