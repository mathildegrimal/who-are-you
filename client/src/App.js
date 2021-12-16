import './App.css';
import React, { useState } from "react";
import PersonsGrid from './components/PersonsGrid';
import ChatBox from "./components/ChatBox";

import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8000");

function App() {
  const [room, setRoom] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("join room", room);
  }

  const handleChange = (e) => {
    setRoom(e.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
          <label htmlFor="room"></label>
        <input type="text" name="room" onChange={handleChange}/>
          <button type="submit">Rejoindre</button>
      </form>
      <PersonsGrid />
      <ChatBox roomName={room} socket={socket}/>
    </div>
  )
}

export default App
