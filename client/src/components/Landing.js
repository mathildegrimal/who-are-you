import React, {useState} from 'react'
import './Landing.css';
const Landing = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [room, setRoom] = useState("");
    const [name, setName] = useState("");
    const [landingDisplay, setLandingDisplay] = useState("landing");

    const handleSubmit = (e) => {
      e.preventDefault();
      props.socket.emit("join room", { room: room, name: name });
      setDisabled(true);
      setLandingDisplay("none");
      props.setMainDisplay("visible");
      props.setRoom(room);
    };

    const handleChangeRoom = (e) => {
      setRoom(e.target.value);
     
    };

    const handleChangeName = (e) => {
      setName(e.target.value);
      props.setName(e.target.value);
    };
    return (
      <form className={`landing ${landingDisplay}`} onSubmit={handleSubmit}>
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
        <button className="landing-button" type="submit" disabled={disabled}>
          Rejoindre
        </button>
      </form>
    );
}

export default Landing
