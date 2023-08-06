import React from 'react'
import { useState} from 'react'
import  axios from 'axios'
const PostComments = (props) => {


     
    const [comment,setComment]=useState('')
    const userName=localStorage.getItem("user_Name")
   const [commentShowdown, setCommentShowdown] = useState(null);
   const userId=localStorage.getItem("user_Id")
    

    const commentedUser=(e)=>{ 
        e.preventDefault()
   console.log('commented user data is',e.target.value);
   setComment(e.target.value)
 }
   const commentSubmit=async(e)=>{
     e.preventDefault()
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
 
  
 
   }
   const handleClick = index => {
  
   setCommentShowdown((prev) => {
      return prev === index? null : index;
  });
 
  };
  
  return (
    <>
  <span style={{marginLeft:'82rem'}}> <i class="fa-solid fa-comment" style={{color:'#476fb3',fontSize:"30px"}}  onClick={()=>handleClick(props.index)}></i></span> 
  <div   className='detailbox' >
  <div class="titleBox">
   
  </div> 
  <div class="commentBox">
      
      <p class="taskDescription"> </p>
  </div>
 <div class="actionBox">
  {commentShowdown === props.index  && props.commentArray.length===0?(<p>not comments yet</p>):"" }
{ commentShowdown === props.index  && props.commentArray.map((commentobj,index)=>(
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
              
               
                 <p key={index} style={{fontWeight:'bold',color:"#19261d"}}>{commentobj.commentedUserName}<span style={{fontWeight:'lighter'}}>:{commentobj.comment} </span></p>
    

              </div>
              
              
          </li>
      </ul>  
      <form class="form-inline" onSubmit={commentSubmit} id={props._id} >
          <div class="form-group">
              <input class="form-control" type="text" name="comment " onChange={commentedUser} placeholder="Your comments" />
          </div>
         
              <button type="submit"   class="btn btn-default" style={{marginBottom:'39px',color:'#476fb3'}}> <i className="fa fa-paper-plane" aria-hidden="true"></i></button>
      </form>
</div>
)

 )}
 </div> 
</div>
    
    </>
  )
}

export default PostComments