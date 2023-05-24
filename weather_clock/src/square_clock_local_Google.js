import React, { useState, useEffect } from "react";
// import React from "react";
import "./Clock.css";


// Fetch the time zone data

async function getLocalTime(latitude, longitude, apiKey) {
  // Construct the API endpoint URL
  const apiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=0&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    console.log ('coordinates clock  ' + longitude + latitude)
    const { dstOffset, rawOffset } = data;
    console.log ('dstOffset + rawOffset'  + dstOffset + rawOffset )
    const currentTime = new Date().getTime() / 1000; // Convert current time to seconds
    const timezoneOffset = dstOffset + rawOffset; // Calculate the total timezone offset
    // const localTime = new Date(currentTime + timezoneOffset * 1000); // Adjust the current time with the offset
    const localTime = new Date(currentTime - timezoneOffset * 7000);
    console.log('logSquare  ' + currentTime + '  ' + timezoneOffset)
    return localTime;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const SquareClockLocal = ({ latitude, longitude, apiKey }) => {
  const [localTime, setLocalTime] = useState(null);

    // Update the time every second using the useEffect hook
    useEffect(() => {
      getLocalTime(latitude, longitude, apiKey)
        .then(time => {
          setLocalTime(time);
        });
    }, [latitude, longitude, apiKey]);
  
    

  // Helper function to format time values with leading zeros
  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  // Get the formatted time string in the format "HH:MM:SS AM/PM"
  const getFormattedTime = () => {
    if (localTime) {
      const hours = formatTime(localTime.getHours() % 12 || 12);
      const minutes = formatTime(localTime.getMinutes());
      const seconds = formatTime(localTime.getSeconds());
      const ampm = localTime.getHours() >= 12 ? "PM" : "AM";

      return `${hours}:${minutes}:${seconds} ${ampm}`;
    }
    return "Loading..."; // Display a loading message while fetching the local time
  };

  return (
    <div className="square-clock">
      {/* Display the formatted time */}
      <div className="digital-display">{getFormattedTime()}</div>
    </div>
  );
};

export default SquareClockLocal;
