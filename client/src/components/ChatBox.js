import React from 'react'
import "./ChatBox.css";
import { io } from "socket.io-client";

function ChatBox() {
    const socket = io();
    socket.on("connection", (message) => {
      console.log("received message from server : ", message);
    });
    socket.emit("confirm", null);

    const handleKeyUp = (e) => {
        console.log(e.code);
        if (e.code === 'Enter') {
            socket.emit('message', e.target.value);
        }
        console.log(e.target.value)
    }
    return (
      <div className="chatbox">
        <input
          type="text"
          onKeyUp={handleKeyUp}
        ></input>
      </div>
    );
}

export default ChatBox
