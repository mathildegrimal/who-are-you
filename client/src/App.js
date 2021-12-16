/* eslint-disable semi */

import './App.css';
import React from 'react';
import PersonsGrid from './components/PersonsGrid';
import ChatBox from "./components/ChatBox";
import { io } from "socket.io-client";


function App() {
  const socket = io();
  socket.emit("greet", (message) => {
    console.log("received message from server : ", message);
    socket.emit("confirm");
  });
  return (
    <div className="App">
      <PersonsGrid />
      <ChatBox/>
    </div>
  )
}

export default App
