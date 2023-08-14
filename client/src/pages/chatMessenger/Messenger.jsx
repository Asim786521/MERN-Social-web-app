import React, { useEffect, useState } from 'react'
import "./messenger.css"
import Conversation from '../../components/conversations/Conversation'
import Messages from '../../components/messages/Messages'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
function Messenger() {
  const[conversations,setConversations]=useState([])
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId=localStorage.getItem("user_Id")
   useEffect(() => {
     
    

    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/conversations/users");
  
        console.log(res);
        setConversations(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/conversations/${userId}`);
    console.log("conversation ",res);
    //setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await axios.post("http://localhost:4000/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
     <>
    <Navbar/>
    <div className="messenger">
    <div className="chatMenu">
      <div className="chatMenuWrapper">
        
      
      {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} />
              </div>
            ))}
            
       
      
      </div>
    </div>
    <div className="chatBox">
      <div className="chatBoxWrapper">
      {currentChat ? (
          <>
            <div className="chatBoxTop">
              <div>
                <p>{currentChat.username}</p>
              </div>
              {messages.map((m) => (
                    <div >
                      <Messages message={m} own={m.sender === userId} />
                    </div>
                  ))}
                <div  >
                 
                </div>
            
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
          
              ></textarea>
              <button className="chatSubmitButton"   onClick={handleSubmit}>
                Send
              </button>
            </div>
          </>
 
 ) : (
  <span className="noConversationText">
    Open a conversation to start a chat.
  </span>
)}
   
      </div>
    </div>
    <div className="chatOnline">
      <div className="chatOnlineWrapper">
   
      </div>
    </div>
  </div>
</>
  )
}

export default Messenger