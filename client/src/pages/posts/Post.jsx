import React   from 'react'
import Navbar from '../../components/Navbar'
import "./Post.css";
 
 import { useState,useEffect } from 'react';
 import axios from 'axios'
 import {   useNavigate } from 'react-router-dom';
 import Heart from "react-animated-heart";
const Post = () => {

   
  const navigate=useNavigate()
  
    const[profileImage,SetProfileImage]=useState([])
    const[saved,postSaved]=useState('')
    const[liked,postliked]=useState()
    const[likedStatus,setLikedStatus]=useState([])
    const [toggle, setToggle] = useState(true)
    const userId=localStorage.getItem("user_Id")
 
       const[file,setFiles]=useState(null)
       const [title,setTitle]=useState('') 
       //const [id,setId]=useState() 
       
    //
    useEffect(()=>{

      axios.get('http://localhost:4000/posts/get-postData').then((response)=>{
 
 
SetProfileImage(response.data)

 
      }).catch((err)=>console.log(err));

      axios.get('http://localhost:4000/posts/liked-post').then((response)=>{
         console.log("liked post",response.data);
         setLikedStatus(response.data)
    }).catch((err)=>console.log(err));
   
      
   },
    
    [])
      
    
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
     fd.append('_id',userId)
     
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
 
   const savedPostdata={
        userId:data._id,
         title:data.name,
         Image:data.image
    }
   
 
    try{
      const response= await axios.put('http://localhost:4000/posts/saved-post',{savedPostdata})
      console.log("post saved",response.data._id);
     
  

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
        console.log("liked data is",data);
    

    setToggle(!toggle)
    console.log("toggle state is",toggle);
    const likedPostdata={
      userId:data._id,
       title:data.name,
       Image:data.image,
       liked:true
  }
 

  try{
    const response= await axios.put('http://localhost:4000/posts/liked-post',{likedPostdata})
    console.log("post liked",response.data);
   


    if(response.data._id){ 
      
      postliked(response.data._id)
       
    }else{
      alert(response.data.response)
    } 

  } catch (err) {
    console.log(err);
  }

  }

  
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
           
          <div className="postBottomLeft">
            {/* <img className="likeIcon" src={<i class="fa-solid fa-thumbs-up"></i>}   alt="" /> */}
            

            <span className="postLikeCounter"> </span>
          </div>
          <div className="postBottomRight">
          {  liked===obj._id?(<span className="postCommentText">  yuuj</span>):""} 
        </div>
      </div>

    </div>
  
     




    {  liked===obj._id?( <i class="fa-solid fa-heart fa-lg"   size="lg" style={{color: "#f52439",}} ></i>):  <i className="like-icon"  onClick={() => {setToggle(!toggle);likedPost({...obj})}}     ></i>  }

    <div className="postSave">
    {likedStatus.map((likeobj,index)=>(
      <div key={likeobj.likedpostId}>
     { likeobj.likedpostId && likeobj.likedStatus && likeobj.likedpostId===obj._id? (<Heart isClick={toggle} onClick={() => setToggle(!toggle)} />):<Heart isClick={!toggle} onClick={() => setToggle(toggle)} />}
     </div>
            ))}
    
    {/* {  liked===obj._id?(<span>!<Heart isClick={toggle} onClick={() => setToggle(!toggle)} /></span>):"" } */}
     
    
 
    {saved && saved===obj._id? (<p className='text-primary'>already saved</p>):<button   type="button" className="btn btn-outline-info  ml-auto"  onClick={() => savedPost({...obj})}>
      <span className="float-right"> <i class="fas fa-save"></i></span></button>}
      </div>


      {/* <div className="postSave">
    {saved &&  obj._id!==saved?(<button   type="button" className="btn btn-outline-info  ml-auto"  onClick={() => savedPost({...obj})}>     <span className="float-right"> <i class="fas fa-save"></i></span></button>):<p className='text-primary'>already saved</p>}
 
      </div> */}
    
          </div>
    ))} 
 
    
   
 
 </div>
   
 

   
   
  )
}

export default Post