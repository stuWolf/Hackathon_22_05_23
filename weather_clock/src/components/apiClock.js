import React, { useState, useEffect } from "react";
import '../App.css'
// import "../Clock.css";



const ApiClock = ({ city, onAmpmChange }) => {

const [localTime, setLocalTime] = useState(null);
// console.log(city)
const key = process.env.REACT_APP_API_KEY;

// console.log(process.env.REACT_APP_API_KEY)

  useEffect(() => {
    const getLocationTime = async () => {
      try {
        // console.log(process.env.REACT_APP_API_KEY)
// console.log('key = ' + key)
// const key = '149318ec39024b14ac6e19ff851c1797';
        const timeResponse = await fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=${key}&location=${city}`);
          console.log('timeResponse' + timeResponse)
          console.log('timeResponseStat' + timeResponse.status)
        // if (timeResponse.status !== 429) {
          if (timeResponse.status === 200) {
        //   setLocalTime(null)
        // } else {

        const timeData = await timeResponse.json();
        
        const currentTime = new Date(timeData.datetime);
        setLocalTime(currentTime);
        
        }

      } catch (error) {
        console.error("Error:", error);
        setLocalTime(null);
      }
      
    }; // end getLocationTime
    
    

    // console.log('localTime:  '+ localTime); // goes every time when any key pressed

    const handleKeyPress = (event) => { 
     
        if ((event.key === 'Enter')) {
        getLocationTime();
        console.log('enter pressed');  // detects only when function initialised
      }
    }; 

// Call the getLocationTime function initially
    if (localTime == null){
      getLocationTime();
      console.log('localTime null');
    }

    document.addEventListener('keydown', handleKeyPress);
     // Update the local time every minute using setInterval
    // const interval = setInterval(getLocationTime, 6000);


   

    // Clean up the interval when the component is unmounted
    return () => {
      // clearInterval(interval);
      document.removeEventListener('keydown', handleKeyPress);
    };

  }, [city, localTime, onAmpmChange, key]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const getFormattedTime = () => {
    if (localTime) {
      const hours = formatTime(localTime.getHours() % 12 || 12);
      const minutes = formatTime(localTime.getMinutes());
    //  const seconds = formatTime(localTime.getSeconds());
      const ampm = localTime.getHours() >= 12 ? "PM" : "AM";
      onAmpmChange(ampm)
      return `${hours}:${minutes} ${ampm}`;
      //return `${hours}:${minutes}:${seconds} ${ampm}`;
    } 
    return " ";
  };
  

  return (
    <div className="square-clock">
      <div className="digital-display">{getFormattedTime()}</div>
    </div>
  );
};

export default ApiClock;