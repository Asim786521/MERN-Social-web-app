import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './Chat.css' 
import {io} from 'socket.io-client'

 


const Chat = () => {

  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

useEffect(()=>{
  socket.current = io("ws://localhost:8900");
  socket.current.on("getMessage", (data) => {
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  });
},[])

const handleSubmit = (event) => {
  event.preventDefault();
  if ( message) {
    socket.current.emit('sendMessage',message );
    setName('');
    setMessage('');
  }
};
console.log(socket);
  return (
    <div>
      <Navbar/>
      <div className='chat-body'>
      <section class="msger">
  <header class="msger-header">
    <div class="msger-header-title">
      <i class="fas fa-comment-alt"></i> SimpleChat
    </div>
    <div class="msger-header-options">
      <span><i class="fas fa-cog"></i></span>
    </div>
  </header>

  <main class="msger-chat">
    <div class="msg left-msg">
      <div
       class="msg-img"
       style={{backgroundImage: `url(https://image.flaticon.com/icons/svg/327/327779.svg)`}}
      ></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">BOT</div>
          <div class="msg-info-time">12:45</div>
        </div>

        <div class="msg-text">
          Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
        </div>
      </div>
    </div>

    <div class="msg right-msg">
      <div
       class="msg-img"
       style={{backgroundImage: `url(https://image.flaticon.com/icons/svg/145/145867.svg)`}}
      ></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">Sajad</div>
          <div class="msg-info-time">12:46</div>
        </div>

        <div class="msg-text">
          You can change your name in JS section!
        </div>
      </div>
    </div>
  </main>

  <form class="msger-inputarea" onSubmit={handleSubmit}>
    <input type="text" value={message} class="msger-input" onChange={(event) => setMessage(event.target.value)}   placeholder="Enter your message..."/>
    <button type="submit"   class="msger-send-btn">Send</button>
  </form>
</section>
    </div>
 </div>
  )
}

export default Chat