import React, { useState } from "react";
import { fetchDefaultWeatherData } from "../utils/weatherDataFetch";
import './searchBar.css'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'


export default function SearchBar() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  /* Wolf you can access the city's longitude and latitude data using 
  weatherData.coord.lon and weatherData.coord.lat, also time zone
  weatherData.timezone */

  const handleChange = (e) => {
    //e.preventDefault()
    setCityName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(cityName)
    setError(null);
    const fetchedWeatherData = await fetchDefaultWeatherData(cityName, setError);
    setWeatherData(fetchedWeatherData);
    setCityName('')
  };

  const iconFetcher = () => {
    let iconCode = weatherData.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return iconUrl;
  };

  return (
    <div className="main-container">
      <div >
      {error ? (
        <p>{error}</p>
      ) : (
        weatherData && weatherData.weather && (
          <div className="weather-container">
            <div className="weather-data">
              
              <h3><FontAwesomeIcon icon={faLocationDot} /> {weatherData.name} </h3> 
              <h1>11:43pm</h1> 
              {/* Wolf based on the wireframe clock component should come here. */}
              ________________________
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
            type="text"
            placeholder="Search location..."
            onChange={handleChange}
            value={cityName}
          />
          
        </div>
      </form>
    </div>
  );
}
