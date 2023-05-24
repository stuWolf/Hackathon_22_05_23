
export async function fetchDefaultWeatherData(cityName, setError) {
const API_KEY = "1b825daf58d455d1161c0dd1607a1aec"
  
try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("City doesn't exist");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setError(error.message);
    return null;
  }
}