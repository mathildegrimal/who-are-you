import React, { useState, useEffect } from "react";
import "./ChatBox.css";

function ChatBox(props) {

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    props.socket.on("chat message", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }, [props.socket]);

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(props.roomName);
    props.socket.emit("message", {
      roomName: props.roomName,
      msg: inputMessage,
      name: props.name,
    });
  };

  return (
    <div className="chatbox">
      <input type="text" onChange={handleChange}></input>
      <button onClick={handleSubmit}>Envoyer</button>

      <div className="messages-container">
        {messages.map((data, index) => {
          return (
          <div 
          key={index}
          className={(data.name === props.name? 'self' : 'external')+' message'}
          >
            {data.msg}
          </div>);
        })}
      </div>
    </div>
  );
}

export default ChatBox;
