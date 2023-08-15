import React, { useEffect, useState } from 'react'
import './conversation.css'
import axios from 'axios';
function Conversation({conversation}) {


  const [user, setUser] = useState('');
  const [profile, setProfile] = useState('');
const userId=localStorage.getItem("user_Id")
 

useEffect(() => {
   const friendId = conversation.members.find((m) => m !==userId);

  const getUser = async () => {
    try {
      const res = await axios("http://localhost:4000/conversations/users?userId=" + friendId);
      setUser(res.data.username);
      setProfile(res.data.profileImage)
      console.log('user data is',res);
    } catch (err) {
      console.log(err);
    }
  };
  getUser();
}, [userId,conversation]);
  return (

    
        <div className="conversation">
    <img
      className="conversationImg"
      src={`http://localhost:4000/User/${profile}`}
      alt="#"
    />
    <span className="conversationName">{user}</span>
  </div>
 
  )
}

export default Conversation