import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: "a5526d01de436f1dbfc873848f2ee41c",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
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
          setWeatherInfo(
            `${data.name}, ${data.sys.country}: ${data.weather[0].description}, ${data.main.temp}°C `
          );
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
          <div>Loading...</div>
        ) : (
          <>
            {errorMessage ? (
              <div style={{ color: "red" }}>{errorMessage}</div>
            ) : (
              <div className="display-info">{weatherInfo}</div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
