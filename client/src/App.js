/* eslint-disable semi */

import './App.css';
import React from 'react';
import PersonsGrid from './components/PersonsGrid';
import ChatBox from "./components/ChatBox";


function App() {
  
  return (
    <div className="App">
      <PersonsGrid />
      <ChatBox/>
    </div>
  )
}

export default App
