import React from 'react'
import { useState } from 'react';
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
                            
                                <div className="form-inline ml-auto"><p><a style={{marginRight:'12rem',color:'rgb(170, 51, 106)',fontWeight:'bold'}} href='/saved'>Saved</a></p>
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
                            <button   onClick={handleLogout}>logout</button>
                            </div>
                        </div>
                        <div className={`sidebar-overlay ${isOpen === true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
               </div>
               
            </>
        )
        }
   
 

export default Navbar