import React from 'react'
import './conversation.css'
function Conversation() {
  return (
    <div className="conversation">
    <img
      className="conversationImg"
      src={`http://localhost:4000/User/14.jpg`}
      alt="#"
    />
    <span className="conversationName">name</span>
  </div>
  )
}

export default Conversation