import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: process.env.REACT_APP_BASE_URL,
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      //Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(data);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <>
      <div className="background">
        <div className="search-content">
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="City"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="button-wrapper">
              <button>Search</button>
            </div>
          </form>
        </div>
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : (
          <>
            {errorMessage ? (
              <div className="error-message">{errorMessage}</div>
            ) : (
              <div className="display-info">
                <h2>
                  {weatherInfo
                    ? `${weatherInfo.name}, ${weatherInfo.sys.country}`
                    : ``}
                </h2>
                <h1>{weatherInfo ? `${weatherInfo.main.temp}°C` : ``}</h1>
                <h3>{weatherInfo?.weather[0].description}</h3>
                <div className="others-info">
                  <p>
                    {weatherInfo
                      ? `Feels like: ${weatherInfo.main.feels_like}°C`
                      : ``}
                  </p>
                  <p>
                    {weatherInfo
                      ? `Wind: ${(weatherInfo.wind.speed * 3.6).toFixed(
                          1
                        )} km/h`
                      : ``}
                  </p>
                  <p>
                    {weatherInfo
                      ? `Visibility: ${
                          weatherInfo.visibility / 1000
                        }                      
                         km`
                      : ``}
                  </p>
                  <p>
                    {weatherInfo
                      ? `Humidity: ${weatherInfo.main.humidity}%`
                      : ``}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
