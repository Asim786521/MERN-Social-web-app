import React from 'react'
import { useState ,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.css'
 import axios from 'axios'
const Navbar = ( ) => {
    const navigate=useNavigate()
    const [isOpen, setIsopen] = useState(false);
    const[file,setFiles]=useState(null)
    const[userName,setUserName]=useState('')
    const[toggle,setToggle]=useState(false)
    const[profileImage,setProfileImage]=useState()
    const userId=localStorage.getItem("user_Id")
















    useEffect (()=>{
       const getUser=async () => {
            try{

          
        const res=  await  axios.get(`http://localhost:4000/auth/getUser-Profile/${userId}`)
            setUserName(res.data.name) 
        setProfileImage(res.data.profileImage)  
      
        }  catch(error){
            console.log(error);
        }
    }
    getUser()

    },[userId, profileImage])

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

    const handleSubmit=async(e)=>{
        e.preventDefault();
   
   
  
        const fd=new FormData()
        fd.append('file',file,)
     
       fd.append('_id',userId)
       
        try{
       const URL='http://localhost:4000/user/add-profileImage'
  
    const res=  await axios.post(URL,fd,{headers: {"Content-type": "multipart/form-date", } }   ) 
           
         console.log(res)
         setProfileImage(res.data.profileImage)
        
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
       {toggle && toggle?(<div className="avatar-edit"  >
            <input type='file' id="imageUpload"  name="file" onChange={handleFileInput}  accept=".png, .jpg, .jpeg" />
            <label for="imageUpload">{file?( <button      style={{marginLeft:'53px'}} type="submit" onClick={handleSubmit}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>):""}    </label>
      
        </div>):""} 
        <div className="avatar-preview">
            <div id="imagePreview"          onClick={()=>setToggle(!toggle)}               style={{backgroundImage:`url(http://localhost:4000/User/${profileImage})`}}>
             
            </div>
        </div> 
 
    </div>
                             
                         
                                 <div className="form-inline ml-auto">
                               <h4 className='profile-name' >{userName}</h4>
                                    <p>
                                <Link to='/liked' className="liked" a><i class="fa fa-thumbs-up" aria-hidden="true" /></Link></p>
                                   <p> <Link to='/saved' class="saved">Saved</Link></p>
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