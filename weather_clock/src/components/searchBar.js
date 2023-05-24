import React, { useState } from "react";
import { fetchDefaultWeatherData } from "../utils/weatherDataFetch";

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
  };

  const iconFetcher = () => {
    let iconCode = weatherData.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return iconUrl;
  };

  return (
    <div className="search-bar-container">
      <div >
      {error ? (
        <p>{error}</p>
      ) : (
        weatherData && weatherData.weather && (
          <>
            <p>{weatherData.name}</p>
            {/* Wolf based on the wireframe clock component should come here. */}
            <p> {weatherData.weather[0].description} </p>
            <img id="weather-icon" src={iconFetcher()} alt="Weather icon" />
            <p>
              {Math.floor(weatherData.main.temp_max)}/
              {Math.floor(weatherData.main.temp_min)} C{" "}
            </p>
            
          </>
        )
      )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search location..."
            onChange={handleChange}
            value={cityName}
          />
          <button type="submit">Go</button>
        </div>
      </form>
    </div>
  );
}
