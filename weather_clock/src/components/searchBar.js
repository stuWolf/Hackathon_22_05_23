import React, { useState } from "react";
import { fetchDefaultWeatherData } from "../utils/weatherDataFetch";
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import ApiClock from "./apiClock";

export default function SearchBar() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  // const [ampm, setAmpm] = useState("AM")
  const [showInstructions, setShowInstructions] = useState(true)

  /* Wolf you can access the city's longitude and latitude data using 
  weatherData.coord.lon and weatherData.coord.lat, also time zone
  weatherData.timezone */

  const handleChange = (e) => {
    //e.preventDefault()
    setCityName(e.target.value);
  };
  
  const handleAmpmChange = (newAmpm) => {
    // setAmpm(newAmpm)

    setTimeout(() => {
    document.documentElement.style.setProperty(
      "--background-gradient",
      newAmpm === "AM"
      ? "linear-gradient(45deg, #c8edf0, rgba(239,183,192,0.44) 91.2%)" 
      : "linear-gradient(45deg, #9ab8ba, #2c3a3b)"
    )

    document.documentElement.style.setProperty(
      "--text-color",
      newAmpm === "AM" ? "#000000" : "#f1fafa"
    )
  
    document.documentElement.style.setProperty(
      "--text-shadow",
      newAmpm === "AM" ? "" : "1px 1px #2c3a3b"
    )

  }, 10) 
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(cityName)
    setError(null);
    const fetchedWeatherData = await fetchDefaultWeatherData(cityName, setError);
    setWeatherData(fetchedWeatherData);
    setShowInstructions(false)
    //setCityName("")
  };

  const iconFetcher = () => {
    let iconCode = weatherData.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return iconUrl;
  };

  return (
    <div className="main-container">
      {showInstructions && (
        <div className="instructions">
          <h3>Welcome to GP Weather Clock.</h3>
          <br />
          <br />
          <p>Search to receive time and weather information.</p>
        </div>
      )}
      <div >
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        weatherData && weatherData.weather && (
          <div className="weather-container">

            <div className="weather-data">
              <h3><FontAwesomeIcon icon={faLocationDot} /> {weatherData.name}</h3>
              <h1><ApiClock city={cityName} onAmpmChange={handleAmpmChange} /> </h1>
              <p><em>{weatherData.weather[0].description}.</em></p>
            </div>

            <div className="weather-icon-temp">
              <img id="weather-icon" src={iconFetcher()} alt="Weather icon" />
                <div className="temp-display">
                <p><em>High: {""}
                  {Math.floor(weatherData.main.temp_max)}°C </em>
                </p>
                <p><em>Low: {""}
                  {Math.floor(weatherData.main.temp_min)}°C</em>
                </p>
                </div>
            </div>
            
          </div>
        )
      )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
        <button type="submit" class="btn"><i class="fas fa-search"></i></button>
          <input
            className="user-input"
            type="text"
            placeholder="Search location..."
            value={cityName}
            onChange={handleChange}
          />
          
        </div>
      </form>
    </div>
  );
}
