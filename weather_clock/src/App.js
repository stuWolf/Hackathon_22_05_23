import React, { useState, useEffect } from 'react';
// import React from "react"
import Clock from "./Clock";
import SearchBar from './components/searchBar';




function App() {
  const [latitude, setLatitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log("Constructor Runs first");
    // Start a timer to update the date every second
    const timerId = setInterval(() => {
        setDate(new Date());
      }, 1000);

    // Get user's current position
    window.navigator.geolocation.getCurrentPosition(
      position => setLatitude(position.coords.latitude),
      error => setErrorMessage(error.message)
    );

    console.log("3. component did mount runs after first render");

    // Clean up timer when component unmounts
    return () => {
      console.log("5. component WILL UNMOUNT runs towards end of component lifecycle");
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    console.log("4. component did UPDATE runs after SUBSEQUENT renders, not first render");

    // Start a timer to update the date every second
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Clean up timer when component updates
    return () => {
      clearInterval(timerId);
    };
  }, [date]);

  function isItWarm() {
    const month = new Date().getMonth();

    if (
      ((month > 4 && month <= 9) || latitude > 0) ||
      ((month <= 4 && month > 9) || latitude < 0) ||
      latitude === 0
    ) {
      return true;
    }

    return false;
  }

  function getClockIcon() {
    if (isItWarm()) {
        console.log('summer 1');
      return "Summer.png";
    }

    console.log('winter');
    return "winter.ipg";
  }
//let icon={latitude ? getClockIcon() : null}
  return (
    <div>
      <SearchBar />
      <h1>{latitude}</h1>
      
      {errorMessage || (
        <Clock date={date} icon={latitude ? getClockIcon() : null} />
        // return a Clock object and pass date and icon
      )}
    </div>
  );
}

export default App;


