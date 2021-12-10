const Button = (props) => {
    return (
        <div>
            <input type="text" name="answer"/>
            <button disabled={props.disabled}>Submit answer</button>
        </div>
    )
}

export default Button
