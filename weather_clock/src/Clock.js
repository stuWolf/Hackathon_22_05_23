import React from "react";
import "./Clock.css";
// import autumn from './images/autumn.png';
import Summer from './images/Summer.png';
// import winter from './images/winter.jpg';

const Clock = (props) => {
    const seconds = props.date.getSeconds();
    const minutes = props.date.getMinutes();
    const hours = props.date.getHours();
    let season = '';
    // let background = props.icon;

    // let background = `url('./Summer.png')`;  // url('../../images/Matterhorn.jpg');
    console.log(`from clock.js ${props.icon}`);

if (props.icon === 'Summer')
{ season = Summer};
// else:
// { season = autumn};


    return (
        <div className="container">
            {/* <h1>`url(./${props.icon})`</h1> */}
            {/* props.icon = Summer.png*/}
            {/* <img src={autumn} alt="  autumn"></img> */}
            {/* working */}
            {/* <h1>{props.icon}</h1> 
            <h1>{background}</h1>
            <h1>{props.timezone}</h1>
            <h1>{background}</h1> */}
                      {/* <h3 className="label">{props.timezone}</h3> */}
            <div className="clock-face" style={{ background: `url(${season})` }}> 
      {/* <div className="clock-face" style={{ background: `url(${autumn})` }}> */}
            {/* <div className="clock-face" style={{ backgroundImage: autumn }}> */}
                <div className="clock">
                    <div className="hours-container">
                        <div className="hours" style={{ transform: `rotateZ(${(hours * 30) + (minutes / 2)}deg)` }}></div>
                    </div>
                    <div className="minutes-container">
                        <div className="minutes" style={{ transform: `rotateZ(${(minutes * 6)}deg)` }}></div>
                    </div>
                    <div className="seconds-container">
                        <div className="seconds" style={{ transform: `rotateZ(${(seconds * 6)}deg)` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Clock;