import React from 'react'
import Navbar from '../../pages/Navbar/Navbar'
import { useEffect ,useState} from 'react'
import axios from 'axios'
const SavedPosts = () => {

  const[saved,setSaved]=useState([])
  useEffect(()=>{
  
    const URL='http://localhost:4000/posts/posts-saved'
      axios.get(URL).then((res)=>{
    console.log("saved data received",res.data);
    setSaved(res.data)
      })
  },[])
  return (
    
    <>
    <Navbar/>
    {saved &&(
      saved.map((obj,index)=>(
 <div className="card" style={{width: "18rem",marginLeft:'14rem',
    marginTop:"7rem"}}>
  <img src={`http://localhost:4000/Images/${obj.Image}`} className="card-img-top" alt=""/>
  <div className="card-body">
    <p className="card-text">{obj.title}</p>
  </div>
</div>
      ))
    )}
   
   </>
  )
}

export default SavedPosts