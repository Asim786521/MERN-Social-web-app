import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.css'
 import axios from 'axios'
const Navbar = ( ) => {
    const navigate=useNavigate()
    const [isOpen, setIsopen] = useState(false);
    const[file,setFiles]=useState(null)
    const userId=localStorage.getItem("user_Id")
    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }

    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

    const handleFileInput = (e) => {
        // handle validations
    console.log(e.target.files);
   
        setFiles(e.target.files[0]) 
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
   
   
  
        const fd=new FormData()
        fd.append('file',file,)
     
       fd.append('_id',userId)
       
        try{
       const URL='http://localhost:4000/user/add-profileImage'
  
       axios.post(URL,fd,{headers: {
        "Content-type": "multipart/form-date",
    } }
       
         ).then(res=>console.log(res.data))
          navigate('/')
        }catch(err){
  console.log(err);
        }
    }
        return (
            <>

            
                <div className="container-fluid mt-3">
                    
                     <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-md">
                            <div className="container-fluid p-2">
                    
                                <div class="avatar-upload">
        <div className="avatar-edit">
            <input type='file' id="imageUpload"  name="file" onChange={handleFileInput}  accept=".png, .jpg, .jpeg" />
            <label for="imageUpload">   <button type="submit" onClick={handleSubmit}><i className="fa fa-paper-plane" aria-hidden="true"></i></button> </label>
      
        </div>
        <div className="avatar-preview">
            <div id="imagePreview" style={{backgroundImage:'url(https://media.licdn.com/dms/image/C5603AQG_HhhFAppr0g/profile-displayphoto-shrink_100_100/0/1660144495459?e=1696464000&v=beta&t=AlTK965MCoLusDfY8dgVRGuQVkq4BVtPypXMWVHKxnc)'}}>
            </div>
        </div>
    </div>
                             
                         
                                <div className="form-inline ml-auto"><p>
                                <a href='/liked' class="liked"><i class="fa fa-thumbs-up" aria-hidden="true" /></a></p>
                                   <p> <a  href='/saved' class="saved">Saved</a></p>
                                    <div className="btn btn-primary" onClick={ToggleSidebar} >
                                        <i className="fa fa-bars"></i>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <div className={`sidebar ${isOpen === true ? 'active' : ''}`}>
                            <div className="sd-header">
                                <h4 className="mb-0">feed</h4>
                                <div className="btn btn-primary" onClick={ToggleSidebar}><i className="fa fa-times"></i></div>
                            </div>
                            <div className="sd-body">
                                <ul>
                            
        
     
            
                                <li><a className="sd-link" href='/posts'>posts</a>
                                </li>
                                    <li><a className="sd-link" href='/chats'>chat</a></li>
                                     
                                    
                                </ul>
                            <button   onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i></button>
                            </div>
                        </div>
                        <div className={`sidebar-overlay ${isOpen === true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
               </div>
               <div class="container">
    
    
</div>
            </>
        )
        }
   
 

export default Navbar