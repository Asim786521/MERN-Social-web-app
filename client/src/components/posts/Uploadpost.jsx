import React from 'react'
import axios from 'axios'
import {  useState} from 'react'
import {   useNavigate } from 'react-router-dom';
const Uploadpost = () => {
    const navigate=useNavigate()
    const[file,setFiles]=useState(null)
    const [title,setTitle]=useState('') 
    const userId=localStorage.getItem("user_Id")


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
  return (

    <>
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
 </> )
}

export default Uploadpost