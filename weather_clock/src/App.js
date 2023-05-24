import React, { useState, useEffect } from 'react';
// import React from "react"
import moment from 'moment-timezone';
// import Clock from "./Clock";
import SquareClock from "./square_clock";
import SquareClockLocal from "./square_clock_local";




function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [timezone, setTimezone] = useState(null);
  // const [errorMessage, setErrorMessage] = useState('');
  const [ setErrorMessage] = useState('');
  const [date, setDate] = useState(new Date());
  let latitudeDisplay, longitudeDisplay = 0;
  let FixlatitudeDisplay, FixlongitudeDisplay = 0;
  const Fixlatitude = 51.5; // Example latitude value
  const Fixlongitude = -0.12775; // Example longitude value

  // local : -38.02, 145.12, London 51.5, -0.127
// const apiKey = 'My_Key'; // Replace with your actual API key

  useEffect(() => {
    console.log("Constructor Runs first");
    // Start a timer to update the date every second
    const timerId = setInterval(() => {
        setDate(new Date());
      }, 1000);

    // Get user's current position
    window.navigator.geolocation.getCurrentPosition(
      position => setLatitude(position.coords.latitude),
      position => setTimezone(position.coords.timezone),
      error => setErrorMessage(error.message)
    );

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        // Retrieve the timezone using Moment.js
        const tz = moment.tz.guess();
        setTimezone(tz);
      },
      (position) => setLatitude(position.coords.latitude),
      (error) => setErrorMessage(error.message)
      
    );




    

    console.log("3. component did mount runs after first render");
    console.log(`Timezone: ${timezone}`)
    // Clean up timer when component unmounts
    return () => {
      console.log("5. component WILL UNMOUNT runs towards end of component lifecycle");
      clearInterval(timerId);
    };
  }, [timezone, setErrorMessage]);

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

  
if(latitude  === null ){latitudeDisplay =  0}
else {
  latitudeDisplay = latitude.toFixed(2);
 
}

if(longitude === null ){longitudeDisplay= 0}
else {
  
  longitudeDisplay = longitude.toFixed(2);
}
 
if(Fixlatitude  === null ){FixlatitudeDisplay =  0}
else {
  FixlatitudeDisplay = Fixlatitude.toFixed(2);
 
}

if(Fixlongitude === null ){FixlongitudeDisplay= 0}
else {
  
  FixlongitudeDisplay = Fixlongitude.toFixed(2);
}

  return (
    <div>
    
      <h3>Timezone: {timezone}</h3>
      <h3>Local Latitude: {latitudeDisplay}</h3>
      <h3>Local Longitude: {longitudeDisplay}</h3>
      
      <div> 
      
    <SquareClock></SquareClock>

      </div>
      <div> 
      <h3>Fix Latitude: {FixlatitudeDisplay}</h3>
      <h3>Fix Longitude: {FixlongitudeDisplay}</h3>
      {/* <SquareClockLocal latitude={Fixlatitude} longitude={Fixlongitude} apiKey={apiKey} /> */}
      <SquareClockLocal latitude={Fixlatitude} longitude={Fixlongitude} />
      </div>
    </div>
    
  );
}

export default App;


