import React, { useState, useEffect } from "react";
import "./ChatBox.css";

function ChatBox(props) {
   
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    useEffect(() => {
      props.socket.on("chat message", (msg) => {
        setMessages(messages => [...messages, msg]);
        console.log("messages", msg);
      });
    
    }, [props.socket])
    
    const handleChange = (e) => {
        setInputMessage(e.target.value);
    }

  const handleSubmit = (e) => {
      console.log(props.roomName);
      props.socket.emit("message", { roomName:props.roomName, msg:inputMessage });
    };

    return (
      <div className="chatbox">
        <input
          type="text"
          onChange={handleChange}
            ></input><button onClick={handleSubmit}>Envoyer</button>
            {messages.map((message, index) => {
                return (<div key={index}>{message}</div>)
            })}
            
      </div>
    );
}

export default ChatBox
