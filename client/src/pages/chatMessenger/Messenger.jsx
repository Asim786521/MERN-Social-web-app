import React from 'react'
import "./messenger.css"
import Conversation from '../../components/conversations/Conversation'
function MEssenger() {
  return (
    <div className="messenger">
    <div className="chatMenu">
      <div className="chatMenuWrapper">
        <input placeholder="Search for friends" className="chatMenuInput" />
      
          <div   >
            <Conversation />
          </div>
      
      </div>
    </div>
    <div className="chatBox">
      <div className="chatBoxWrapper">
     
          <>
            <div className="chatBoxTop">
           
                <div  >
                 
                </div>
            
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
        
          
              ></textarea>
              <button className="chatSubmitButton"  >
                Send
              </button>
            </div>
          </>
 
          <span className="noConversationText">
            Open a conversation to start a chat.
          </span>
   
      </div>
    </div>
    <div className="chatOnline">
      <div className="chatOnlineWrapper">
   
      </div>
    </div>
  </div>

  )
}

export default MEssenger