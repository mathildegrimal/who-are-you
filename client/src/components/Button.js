import React, { useState, useEffect } from "react";

const Button = (props) => {

    const [result, setResult] = useState("Vous pouvez soumettre une réponse quand tous les personnages sauf un sont éliminés");
    const [inputAnswer, setInputAnswer] = useState("");
    useEffect(() => {
        props.socket.on(`result-${props.socket.id}`, (result) => {
            setResult(result);
        });
    })
    const handleChange = (e) => {
        e.preventDefault();
        setInputAnswer(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.socket.emit("answer", { answer: inputAnswer, name: props.name, roomName: props.roomName });
    }
    return (
      <div>
        <div className="form-answer">
          <select
            disabled={props.disabled}
            onChange={handleChange}
            type="text"
            name="answer"
          >
            <option value=""></option>
            {props.personsList.map((person, index) => {
              return (
                <option key={index} value={person.name}>
                  {person.name}
                </option>
              );
            })}
          </select>
          <button
            onClick={handleSubmit}
            className={
              props.disabled ? "answer-button disabled" : "answer-button"
            }
            disabled={props.disabled}
          >
            J'ai deviné !
          </button>
        </div>
        <div className={`${result} result`}>{result} !</div>
      </div>
    );
}

export default Button
