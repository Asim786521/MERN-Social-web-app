import React, { useEffect, useState } from 'react'
import './conversation.css'
import axios from 'axios';
function Conversation({conversation}) {


  const [user, setUser] = useState(null);
const userId=localStorage.getItem("user_Id")
 

// useEffect(() => {
//    const friendId = conversation.members.find((m) => m !==userId);

//   const getUser = async () => {
//     try {
//       const res = await axios.get(`http://localhost:4000/conversation/users/${friendId}`);
//       setUser(res.data);
//       console.log('user data is',res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   getUser();
// }, [conversation]);
  return (

    
        <div className="conversation">
    <img
      className="conversationImg"
      src={`http://localhost:4000/User/${conversation.profileImage}`}
      alt="#"
    />
    <span className="conversationName">{userId && userId===conversation._id?"you":conversation.username}</span>
  </div>
 
  )
}

export default Conversation