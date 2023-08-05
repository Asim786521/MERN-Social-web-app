import React   from 'react'
import Navbar from '../../components/Navbar'
import "./Post.css";
 
 import { useState,useEffect } from 'react';
 import axios from 'axios'
 import {   useNavigate } from 'react-router-dom';
 import Heart from "react-animated-heart";
const Post = () => {

   
  const navigate=useNavigate()
  
    const[postItems,SetPostItems]=useState([])
    
    const[saved,postSaved]=useState('')
    const[liked,postliked]=useState()
    const[likedStatusCheck,setLikedStatusCheck]=useState([])
    const[commentArr,setcommentArr]=useState([])
  
    const [toggle, setToggle] = useState(true)

    const [comment,setComment]=useState('')
 
       const[file,setFiles]=useState(null)
       const [title,setTitle]=useState('') 
       //const [id,setId]=useState() 
       const [commentShowdown, setCommentShowdown] = useState(null);
           const userId=localStorage.getItem("user_Id")
           const userName=localStorage.getItem("user_Name")
    //
    useEffect(()=>{

      axios.get('http://localhost:4000/posts/get-postData').then((response)=>{
 
 console.log("post items is",response.data);



SetPostItems(response.data)

response.data.map((obj,index)=>(
  
 setcommentArr(obj.comments)
  )
)
 
 
      }).catch((err)=>console.log(err));

      axios.get('http://localhost:4000/posts/liked-post').then((response)=>{
         console.log("liked post",response.data);
         setLikedStatusCheck(response.data)
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
    


    console.log("toggle state is",toggle);
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
    } 

  } catch (err) {
    console.log(err);
  }

  }

const commentedUser=(e)=>{ 
       e.preventDefault()
  console.log('commented user data is',e.target.value);
  setComment(e.target.value)
}
  const commentSubmit=async(e)=>{
    e.preventDefault()
   
    console.log("id is ",e.target.id)
 
  const commentedPosId=e.target.id
    const commentData={
      postId:commentedPosId,
       commentedUserId:userId,
       userName:userName,
       comment:comment
    }
    
try{
 const response= await axios.put('http://localhost:4000/posts/post-comment',{commentData})
 console.log(response)
}catch(error){
  console.log(error);
}
   
//alert(data)
 

  }
  const handleClick = index => {
    // 👇️ toggle shown state
 console.log("commenarray",commentArr);
   
   console.log("comment button clicked",index)
  
    setCommentShowdown((prev) => {
      return prev === index? null : index;
  });
 
 
  
  //     if(postItems[0].comments.length!==0){
  //     return setIsShown(true)
  // }else{
  //    return  setIsShown(false)
  // }
    
   

    // 👇️ or simply set it to true
    // setIsShown(true);
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
 
    {postItems && 
    postItems.map((obj,index)=>(
      
       
 
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
          {  liked===obj._id?(<span className="postCommentText"> </span>):""} 
        </div>
      </div>

    </div>
  
     




    {  liked===obj._id?( <p style={{color:'#f52439'}}>already liked</p>):  <i className="like-icon"  onClick={() => likedPost({...obj})}     ></i>  }

    <div className="postSave">

   

    {likedStatusCheck.filter(status => status.likedStatus===true && status.likedpostId===obj._id).map((likeobj)=>(
        <div key={index}>
    
    <p style={{color: "#f52439",}}>you liked!!!<Heart isClick={toggle} onClick={() => setToggle(!toggle)} /></p>
  
 
 
     </div>
       
     
            ))
            
       
            }

         
 

 
 
 
 
       
    
    

    
   {likedStatusCheck.map((likeobj,index)=>(
        <div key={likeobj.likedpostId}>  
    
    
       { likeobj.likedpostId && likeobj.likedStatus===null && likeobj.likedpostId!==obj._id? (<p style={{color: "#f52439",}}>you bot liked!!!<Heart isClick={toggle} onClick={() => setToggle(!toggle)} /></p>):"" }
    
     </div>
   
     
            ))}      
 
   
     
    
 <div style={{marginLeft:"9rem"}}> 
    {saved && saved===obj._id? (<p className='text-primary'>already saved</p>):<button   type="button" className="btn btn-outline-info  ml-auto" style={{fontSize:"23px"}} onClick={() => savedPost({...obj})}>
      <span className="float-right"> <i class="fas fa-save"></i></span></button>}
 
</div>

    <span style={{marginLeft:'9rem'}}> <i class="fa-solid fa-comment" style={{color:'#476fb3',fontSize:"30px"}}  onClick={()=>handleClick(index)}></i></span> 
      </div>

 

 
 
  
   
  <div   className='detailbox' >
  
     <div class="titleBox">
       <label>Comment Box</label>
 
     </div> 
     <div class="commentBox">
         
         <p class="taskDescription"> </p>
     </div>
    <div class="actionBox">
   { commentShowdown === index  && obj.comments.map((commentobj,index)=>(
    <div>
         <ul class="commentList">
             <li>
                 <div class="commenterImage">
                   <img src="http://placekitten.com/50/50"  alt=''/>
                 </div>
              
             </li>
             <li>
                 <div class="commenterImage">
      
                 </div>
                 
             </li>
             <li>
                 <div class="commenterImage">
                   
                 </div>

               
                   <div class="commentText">
                 
                    {/* { comment.commentedpostId===obj._id ?(  */}
                    <p key={index} style={{fontWeight:'bold',color:"#19261d"}}>{commentobj.commentedUserName}<span style={{fontWeight:'lighter'}}>:{commentobj.comment} </span></p>
                    
                    
                {/* //     )
                    
                //  :"noooo"}  
                */}
                   
 
                 </div>
                 
                 
             </li>
         </ul>  
         <form class="form-inline" onSubmit={commentSubmit} id={obj._id} >
             <div class="form-group">
                 <input class="form-control" type="text" name="comment " onChange={commentedUser} placeholder="Your comments" />
             </div>
            
                 <button type="submit"   class="btn btn-default" style={{marginBottom:'39px',color:'#476fb3'}}> <i className="fa fa-paper-plane" aria-hidden="true"></i></button>
             
        </form> </div>
 )

    )}    </div> 
 </div>
 
    
   

 

{/* {  liked===obj._id?(<span className="postCommentText"> </span>):""}  */}
 

      {/* <div className="postSave">
    {saved &&  obj._id!==saved?(<button   type="button" className="btn btn-outline-info  ml-auto"  onClick={() => savedPost({...obj})}>     <span className="float-right"> <i class="fas fa-save"></i></span></button>):<p className='text-primary'>already saved</p>}
 
      </div> */}
    
          </div>
    ))} 
 
    
   
 
 </div>
   
 

   
   
  )
}

export default Post