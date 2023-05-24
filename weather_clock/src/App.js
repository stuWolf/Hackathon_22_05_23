import React from 'react';
// import React, { useState, useEffect } from 'react';
// import React from "react"

import SearchBar from './components/searchBar';
import SquareClock from "./components/square_clock";
import ApiClock from './components/apiClock';




function App() {
  
 const city = 'London';

  

  return (
    <div>
      <SearchBar />
      {
      <SquareClock></SquareClock>
      }
      <h3> Current time in {city}</h3>
      {
        
      <ApiClock city={city}/>
      }
    </div>
    
  );
}

export default App;


