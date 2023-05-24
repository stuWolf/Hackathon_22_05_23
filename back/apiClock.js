
import React, { useState, useEffect } from "react";
import "../Clock.css";



const ApiClock = ({ city }) => {

  const [localTime, setLocalTime] = useState(null);

//   const username = 'default'
  
  //const apiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=0&key=${apiKey}`;
  
  useEffect(() => {
    const getLocationTime = async () => {
      try {
//         const url = `http://api.geonames.org/timezoneJSON?lat=${latitude}&lng=${longitude}&username=${username}`;
        
// // Fetch the time zone information based on latitude and longitude
//         const response = await fetch(url);
//         const data = await response.json();
//         const timezone = data.timezoneId;
//         console.log('timezoneFetch ' + timezone)
        // const timeResponse = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
        // {"abbreviation":"BST","client_ip":"149.167.149.53","datetime":"2023-05-25T00:24:14.459551+01:00","day_of_week":4,
        //"day_of_year":145,"dst":true,"dst_from":"2023-03-26T01:00:00+00:00","dst_offset":3600,"dst_until":"2023-10-29T01:00:00+00:00","raw_offset":0,"timezone":"Europe/London","unixtime":1684970654,"utc_datetime":"2023-05-24T23:24:14.459551+00:00","utc_offset":"+01:00","week_number":21}

 // Fetch the current time for the determined time zone
        // const timeResponse = await fetch('https://worldtimeapi.org/api/timezone/Europe/London');
        const timeResponse = await fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=e71bc4abca5d4a07a4e3513f87e8759f&location=${city}`);

        const timeData = await timeResponse.json();
        const currentTime = new Date(timeData.datetime);
        setLocalTime(currentTime);
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
    return "Loading...";
  };

  return (
    <div className="square-clock">
      <div className="digital-display">{getFormattedTime()}</div>
    </div>
  );
};

export default ApiClock;