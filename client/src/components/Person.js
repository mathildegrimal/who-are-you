import React, {useState} from 'react';

const Person = (props) => {
    const [activated, setActivated] = useState(true);
    const handleActivated = () => {
        if (activated && props.count > 1) {
            setActivated(false);
            props.setCount(props.count - 1);   
        }
    }
    return (
      <div className="person">
        <img
          className="image-person"
          onClick={handleActivated}
          src={props.image}
          alt={props.name}
        />
        <svg className={activated ? "image-cross" : "image-cross desactivated"} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        <p className="name-person">{props.name}</p>
      </div>
    );
}

export default Person;
