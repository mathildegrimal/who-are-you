import React, { useState, useEffect } from "react";
//import persons from './config/persons';
import './PersonsGrid.css';
import Person from './Person';
import Button from './Button';

//coté front : useEffect pour fetcher les personnages et leurs photos sur le back
export default function PersonsGrid(props) {
    const [count, setCount] = useState(20);
    const [disabled, setDisabled] = useState(true);
    const [persons, setPersons] = useState([]);
    useEffect(() => {
         if (count === 1) {
           setDisabled(false);
         }
        
        const fetchPersons = async () => {
            const persons = await fetch("/api/persons",
                {
                    method: "GET",
                });
            const personsJson = await persons.json();
            setPersons(personsJson);
        } 
        fetchPersons();
    }, [count])
   
    return (
      <div>
        <div>Personne à faire deviner : {props.person.name}</div>
            <img className="image-guess" src={props.person.imageUrl} alt={props.person.name}/>
        <div className="persons-grid">
          {persons.map((person, index) => {
            return (
              <Person
                key={index}
                count={count}
                setCount={setCount}
                name={person.name}
                image={person.imageUrl}
                activated={person.activated}
              />
            );
          })}
          <Button disabled={disabled} />
        </div>
      </div>
    );
};