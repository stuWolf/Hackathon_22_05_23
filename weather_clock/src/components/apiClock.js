import React, { useState, useEffect } from "react";
import '../App.css'
// import "../Clock.css";



const ApiClock = ({ city }) => {

  const [localTime, setLocalTime] = useState(null);


  useEffect(() => {
    const getLocationTime = async () => {
      try {

        const timeResponse = await fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=e71bc4abca5d4a07a4e3513f87e8759f&location=${city}`);

        if (timeResponse.status === 429) {
          setLocalTime(null)
        } else {
        const timeData = await timeResponse.json();
        const currentTime = new Date(timeData.datetime);
        setLocalTime(currentTime);
        }

      } catch (error) {
        console.error("Error:", error);
        setLocalTime(null);
      }
    }; // end effect

    // Call the getLocationTime function initially
    getLocationTime();

    // Update the local time every second using setInterval
    const interval = setInterval(getLocationTime, 60000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, [city]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const getFormattedTime = () => {
    if (localTime) {
      const hours = formatTime(localTime.getHours() % 12 || 12);
      const minutes = formatTime(localTime.getMinutes());
    //   const seconds = formatTime(localTime.getSeconds());
      const ampm = localTime.getHours() >= 12 ? "PM" : "AM";

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