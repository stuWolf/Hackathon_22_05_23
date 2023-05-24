import React, { useState, useEffect } from 'react';

const ApiClock = ({ city }) => {
  const [localTime, setLocalTime] = useState(null);

useEffect(() => {
    //fetch location time

    const getLocationTime = async () => {
      try {
        const timeResponse = await fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=e71bc4abca5d4a07a4e3513f87e8759f&location=${city}`);
        console.log(timeResponse);
        if (timeResponse.status !== 429) {
          const timeData = await timeResponse.json();
          console.log('timedata ' + timeData);
          const currentTime = new Date(timeData.datetime);
          setLocalTime(currentTime);
        }
      } catch (error) {
        console.error("Error:", error);
        setLocalTime(null);
      }
    };

    // handle Enter key press
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        getLocationTime();
        console.log('enter pressed');
      }
    };
    // Set interval to update time every minute
    const interval = setInterval(getLocationTime, 6000); // Update every minute
    // Add event listener for Enter key press
    document.addEventListener('keydown', handleKeyPress);
     // Clean up interval and event listener on component unmount
    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [city]);
  

  //  format time with leading zeros
    const formatTime = (value) => {
      return value < 10 ? `0${value}` : value;
    };

  //  get formatted time
    const getFormattedTime = () => {
      if (localTime) {
        const hours = formatTime(localTime.getHours() % 12 || 12);
        const minutes = formatTime(localTime.getMinutes());
        const seconds = formatTime(localTime.getSeconds());
        const ampm = localTime.getHours() >= 12 ? "PM" : "AM";
  
        //return `${hours}:${minutes} ${ampm}`;
        return `${hours}:${minutes}:${seconds} ${ampm}`;
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