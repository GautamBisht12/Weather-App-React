import { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";

const API_KEY = "67ae6b1a6c674099aea82527231811";

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: black;
`;

const Navbar = styled.div`
  width: 100%;
  position: relative;

  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.3);
`;

const WeatherContent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeatherContainer = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 20px;
  z-index: 1;
  width: 50%;
  height: 50vh;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.1);
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  filter: brightness(0.5); /* To make the image darker for better readability */
`;

const Image = styled.img`
  width: 100%;
  height: 100vh;
`;

const Title = styled.h1`
  color: #fff;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const WeatherInfo = styled.div`
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Add a text shadow for better contrast */
  line-height: 1.6; /* Increase line height for better readability */

  h2 {
    color: #fff; /* Ensure header text color matches the container text color */
    margin-bottom: 10px;
    font-size: 1.8rem; /* Adjust the font size for header */
  }

  p {
    color: #fff; /* Adjust paragraph text color */
    margin-bottom: 8px;
    font-size: 1.2rem; /* Adjust the font size for paragraphs */
  }

  img {
    width: 50px; /* Adjust the width of the weather icon */
    height: auto;
    margin-top: 10px;
  }
`;

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("India");
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
        );
        const data = await response.json();

        if (response.ok) {
          setWeather(data);
          console.log(data);
          setError("");
          setBackgroundImage(
            `https://source.unsplash.com/1600x900/?${data.location.country}`
          );
        } else {
          setError("Invalid city or country name. Please try again.");
          setWeather(null);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Something went wrong. Please try again later.");
        setWeather(null);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSearch = () => {
    setCity(searchQuery);
  };

  return (
    // <Main>
    <MainContainer>
      <Navbar>
        {/* Navbar content */}
        <Title>Weather App</Title>
        <InputContainer>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a city name"
          />
          <button onClick={handleSearch}>Search</button>
        </InputContainer>
      </Navbar>
      {/* <BackgroundImage style={{ backgroundImage: `url(${backgroundImage})` }} />
       */}
      <BackgroundImage>
        <Image src={backgroundImage} alt="" />
      </BackgroundImage>
      <WeatherContent>
        <WeatherContainer>
          {error && <h1 style={{ color: "red" }}>{error}</h1>}
          {weather && (
            <WeatherInfo>
              <h2>
                {weather.location.name}, {weather.location.country}
              </h2>
              <p>
                Temperature: {weather.current.temp_c}°C /{" "}
                {weather.current.temp_f}
                °F
              </p>
              <p>Condition: {weather.current.condition.text}</p>
              <p>Humidity: {weather.current.humidity}%</p>
              <p>Wind: {weather.current.wind_kph} km/h</p>
              <p>Local Time: {weather.location.localtime}</p>
              <img src={weather.current.condition.icon} alt="Weather Icon" />
            </WeatherInfo>
          )}
        </WeatherContainer>
      </WeatherContent>
    </MainContainer>
    // </Main>
  );
};

export default WeatherApp;
