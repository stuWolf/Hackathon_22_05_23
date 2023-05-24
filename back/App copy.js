import React, { useState, useEffect } from 'react';
// import React from "react"
import moment from 'moment-timezone';
import SearchBar from './components/searchBar';
import SquareClock from "./components/square_clock";




function App() {
  //const [latitude, setLatitude] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    console.log("Constructor Runs first");
    // Start a timer to update the date every second
    const timerId = setInterval(() => {
        setDate(new Date());
      }, 1000);

    // Get user's current position
    // window.navigator.geolocation.getCurrentPosition(
    //   position => setLatitude(position.coords.latitude),
    //   position => setTimezone(position.coords.timezone),
    //   error => setErrorMessage(error.message)
    // );

    // window.navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     setLatitude(position.coords.latitude);
    //     // Retrieve the timezone using Moment.js
    //     const tz = moment.tz.guess();
    //     setTimezone(tz);
    //   },
    //   (position) => setLatitude(position.coords.latitude),
    //   (error) => setErrorMessage(error.message)
      
    // );




    

    console.log("3. component did mount runs after first render");
    console.log(`Timezone: ${timezone}`)
    // Clean up timer when component unmounts
    return () => {
      console.log("5. component WILL UNMOUNT runs towards end of component lifecycle");
      clearInterval(timerId);
    };
  }, [timezone]);

  useEffect(() => {
    // console.log("4. component did UPDATE runs after SUBSEQUENT renders, not first render");

    // Start a timer to update the date every second
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Clean up timer when component updates
    return () => {
      clearInterval(timerId);
    };
  }, [date]);

 

  

  return (
    <div>
      <SearchBar />
      {
      //<h1>{latitude}</h1>
      }
      {
      
      }
    </div>
    
  );
}

export default App;


