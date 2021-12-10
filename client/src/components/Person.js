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
      <div
        className={activated ? "active person" : "inactive person"}
        onClick={handleActivated}
      >
        <p>{props.name}</p>
      </div>
    );
}

export default Person;
