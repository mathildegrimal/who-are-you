import React from "react";
//import persons from './config/persons';
import './PersonsGrid.css';
import Person from './Person';

//coté front : useEffect pour fetcher les personnages et leurs photos sur le back
export default function PersonsGrid(props) {
    
   
    return (
      <div>
        

        <div className="persons-grid">
          {props.personsList.map((person, index) => {
            return (
              <Person
                key={index}
                count={props.count}
                setCount={props.setCount}
                name={person.name}
                image={person.imageUrl}
                activated={person.activated}
              />
            );
          })}
        </div>
      </div>
    );
};