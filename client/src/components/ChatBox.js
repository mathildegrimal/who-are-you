import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";
import Button from "./Button";

function ChatBox(props) {

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const inputMessageRef = useRef();
  useEffect(() => {
    props.socket.on("chat message", (data) => {
      setMessages((messages) => [...messages, data]);
    });
    if (props.count === 1) {
      setDisabled(false);
    }
  }, [props.socket, props.count]);

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    props.socket.emit("message", {
      roomName: props.roomName,
      msg: inputMessage,
      name: props.name,
    });
    inputMessageRef.current.value="";
  };

  const handleSubmitEnter = (e) => {
    if (e.code === "Enter") {
      props.socket.emit("message", {
        roomName: props.roomName,
        msg: inputMessage,
        name: props.name,
      });
      inputMessageRef.current.value = "";
    }
  };

  const messageContainer = useRef();

  useEffect(() => {
   const scroll =
     messageContainer.current.scrollHeight -
     messageContainer.current.clientHeight;
   messageContainer.current.scrollTo(0, scroll);
  }, [messages])

  return (
    <div className="chatbox">
      <input
        type="text"
        ref={inputMessageRef}
        onKeyUp={handleSubmitEnter}
        onChange={handleChange}
        placeholder="Posez vos questions ici chacun(e) votre tour"
      />
      <button className="button-chat" onClick={handleSubmit}>
        Envoyer
      </button>

      <div className="messages-container" ref={messageContainer}>
        {messages.map((data, index) => {
          return (
            <div
              className={
                (data.name === props.name ? "self" : "external")+ " message-container"
              }
              key={index}
            >
              <div className="player-name">
                {data.name}
              </div>
              <div
                className={
                  (data.name === props.name ? "self" : "external") + " message"
                }
              >
                {data.msg}
              </div>
            </div>
          );
        })}
      </div>
      <Button
        disabled={disabled}
        personsList={props.personsList}
        socket={props.socket}
        roomName={props.roomName}
        name={props.name}
      />
    </div>
  );
}

export default ChatBox;
