import './App.css';
import React, { useState, useEffect } from "react";
import PersonsGrid from './components/PersonsGrid';
import ChatBox from "./components/ChatBox";
import { ReactComponent as Logo } from "./components/point.svg";
import { io } from "socket.io-client";
import Landing from './components/Landing'
// let location =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:8000/"
//     : "";
const socket = io.connect();
function App() {
  const [count, setCount] = useState(20);
  const [person, setPerson]= useState({});
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [mainDisplay, setMainDisplay] = useState("main");
  const [persons, setPersons] = useState([]);
  socket.on(`config-${socket.id}`, (config) => {
    setPerson(config.person);
  });

  useEffect(() => {
    const fetchPersons = async () => {
      const persons = await fetch("/api/persons", {
        method: "GET",
      });
      const personsJson = await persons.json();
      setPersons(personsJson);
    };
    fetchPersons();
  }, []);
  
  return (
    <div className="App">
      <div className="logo-container">
        <div className={`person-guess ${mainDisplay}`}>
          <img
            className="image-guess"
            src={person.imageUrl}
            alt={person.name}
          />
          <div className="name-guess">
            Personne à faire deviner : {person.name}
            <div>(survoler pour zoomer)</div>
          </div>
        </div>
        <div className="logo-wrapper">
          <p className="title">Who are you</p>
          <div className="logo">
            <Logo />
          </div>
        </div>
        <p className={`room ${mainDisplay}`}>Votre salle : {room}</p>
      </div>
      <Landing
        setMainDisplay={setMainDisplay}
        setName={setName}
        setRoom={setRoom}
        socket={socket}
      />
      <div className={`main ${mainDisplay}`}>
        <div className="main-container">
          <PersonsGrid
            personsList={persons}
            count={count}
            setCount={setCount}
            person={person}
          />
          <div className="chat-container">
            <p className="chat-instructions">Utilisez le chat pour poser
              des question à l'autre joueur
              et deviner quel personnage il possède. L'autre joueur
              ne peut répondre que par oui ou par non !</p>
            <ChatBox
              personsList={persons}
              count={count}
              roomName={room}
              socket={socket}
              name={name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
