import React, { useState, useEffect } from "react";
import "./Clock.css";

const SquareClock = () => {
    // State to hold the current time
  const [time, setTime] = useState(new Date());

    // Update the time every second using the useEffect hook
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the timer when the component is unmounted
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Helper function to format time values with leading zeros
  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };


  // Get the formatted time string in the format "HH:MM:SS AM/PM"
  const getFormattedTime = () => {
    const hours = formatTime(time.getHours() % 12 || 12);
    const minutes = formatTime(time.getMinutes());
    const seconds = formatTime(time.getSeconds());
    const ampm = time.getHours() >= 12 ? "PM" : "AM";

    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div className="square-clock">
      <div className="digital-display">{getFormattedTime()}</div>
    </div>
  );
};

export default SquareClock;
