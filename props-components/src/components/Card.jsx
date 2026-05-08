import React from 'react'

const Card = (props) => {

    const user = "Anukul Tyagi"

    function btnFunction() {
        alert("button is clicked")
    }

    return (
        <div className="card">
            <h1>Hello guys, I'm {props.user}, {props.age}</h1>
            <p>Lorem ipsum dolor sit amet.</p>
            <button onMouseEnter={() => (
                console.log("mouse entered")
            )} onMouseLeave={() => (
                console.log("mouse left")
            )} onClick={btnFunction}>Clicked</button>
        </div>
    )
}

export default Card