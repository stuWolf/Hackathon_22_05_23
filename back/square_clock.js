import React, { useState, useEffect } from "react";
import "../Clock.css";

const SquareClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

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
