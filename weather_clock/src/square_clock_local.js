import React, { useState, useEffect } from "react";
import "./Clock.css";

const SquareClockLocal = ({ latitude, longitude }) => {
  const [localTime, setLocalTime] = useState(null);
  const username = 'demo';
  useEffect(() => {
    const getLocationTime = async () => {
      try {
        console.log ('coordinates clock  ' + longitude +'  '+ latitude)
        //           http://api.geonames.org/timezoneJSON?lat=47.01&lng=10.2&username=demo
        //           http://api.geonames.org/timezoneJSON?lat=51.5&lng=-0.13&username=demo
        const url = `http://api.geonames.org/timezoneJSON?lat=${latitude}&lng=${longitude}&username=${username}`;
        const response = await fetch(url);
        const data = await response.json();
        const timezone = data.timezoneId;
        console.log('timezoneFetch ' + timezone)
        //const timeResponse = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
        // {"abbreviation":"BST","client_ip":"149.167.149.53","datetime":"2023-05-25T00:24:14.459551+01:00","day_of_week":4,
        //"day_of_year":145,"dst":true,"dst_from":"2023-03-26T01:00:00+00:00","dst_offset":3600,"dst_until":"2023-10-29T01:00:00+00:00","raw_offset":0,"timezone":"Europe/London","unixtime":1684970654,"utc_datetime":"2023-05-24T23:24:14.459551+00:00","utc_offset":"+01:00","week_number":21}
        
        
        const timeResponse = await fetch('https://worldtimeapi.org/api/timezone/Europe/London');
        const timeData = await timeResponse.json();
        console.log('worldtime   ' + timeData);
        const currentTime = new Date(timeData.datetime);
        setLocalTime(currentTime);
      } catch (error) {
        console.error("Error:", error);
        setLocalTime(null);
      }
    };

    getLocationTime();

    const interval = setInterval(getLocationTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [latitude, longitude]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const getFormattedTime = () => {
    if (localTime) {
      const hours = formatTime(localTime.getHours() % 12 || 12);
      const minutes = formatTime(localTime.getMinutes());
      const seconds = formatTime(localTime.getSeconds());
      const ampm = localTime.getHours() >= 12 ? "PM" : "AM";
// return `${hours}:${minutes}:${seconds} ${ampm}`;
      return `${hours}:${minutes}:${seconds} ${ampm}`;
    }
    return "Loading...";
  };

  return (
    <div className="square-clock">
      <div className="digital-display">{getFormattedTime()}</div>
    </div>
  );
};

export default SquareClockLocal;
