import './App.css';
import React, { useState } from "react";
import PersonsGrid from './components/PersonsGrid';
import ChatBox from "./components/ChatBox";

import { io } from "socket.io-client";
// let location =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:8000/"
//     : "";
const socket = io.connect();

function App() {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [person, setPerson]= useState("");
  socket.on(`config-${socket.id}`, (config)=>{ setPerson(config.person)});
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("join room", { room: room, name: name });
    setDisabled(true)
  }


  const handleChangeRoom = (e) => {
    setRoom(e.target.value);
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="room">Salle</label>
        <input
          type="text"
          name="room"
          disabled={disabled}
          required
          onChange={handleChangeRoom}
        />
        <label htmlFor="room">Votre nom</label>
        <input
          type="text"
          name="name"
          disabled={disabled}
          required
          onChange={handleChangeName}
        />
        <button type="submit" disabled={disabled}>
          Rejoindre
        </button>
      </form>
      <div className="main">
        <PersonsGrid person={person} />
        <ChatBox roomName={room} socket={socket} name={name}/>
      </div>
    </div>
  );
}

export default App
