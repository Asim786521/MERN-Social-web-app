import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
 
const Navbar = ( ) => {
 
    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }

    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
        return (
            <>

            
                <div className="container-fluid mt-3">
                    
                     <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-md">
                            <div className="container-fluid p-2">
                            <img  className="logo" src= '/VIBGYOR.png' alt='/VIBGYOR.png'/>
                            
                                <div className="form-inline ml-auto"> 
                                <p> <a  href='/liked' className='liked'><i class="fa fa-thumbs-up" aria-hidden="true"></i></a></p>
                                   <p> <a  href='/saved' className='saved' >Saved</a></p>
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
               
            </>
        )
        }
   
 

export default Navbar