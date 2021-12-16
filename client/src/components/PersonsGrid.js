import React, { useState, useEffect } from "react";
import persons from './config/persons';
import './PersonsGrid.css';
import Person from './Person';
import Button from './Button';

//coté front : useEffect pour fetcher les personnages et leurs photos sur le back
export default function PersonsGrid() {
    const [count, setCount] = useState(20);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
         if (count === 1) {
           setDisabled(false);
         }
    }, [count])
   
    return (
        <div className="persons-grid">
            {persons.map((person, index) => {
                return (
                    <Person key={index} count={count} setCount={setCount} name={person.name} image={person.imageUrl} activated={person.activated} />
                );
            })}
            <Button disabled={disabled} />
        </div>
    )
};