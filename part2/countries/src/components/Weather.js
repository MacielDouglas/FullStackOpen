import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weather = ({ city, latlng }) => {
  const [weather, setWeather] = useState([]);
  const [wind, setWind] = useState([]);
  const [icon, setIcon] = useState('01d');

  const imgIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const temp = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latlng.latlng[0]}&lon=${latlng.latlng[1]}&appid=${process.env.REACT_APP_KEY}&units=metric`
      )
      .then((response) => {
        setWeather(response.data.main);
        setWind(response.data.wind);
        setIcon(response.data.weather[0].icon);
      });
  };
  useEffect(temp, []);

  return (
    <div>
      <h2>Weather in {city}</h2>
      <pre>
        <p>temperatur: {weather.temp}° Celsius</p>

        <img src={imgIcon} alt={icon.description} />
        <p>wind: {wind.speed} m/s</p>
      </pre>
    </div>
  );
};

export default Weather;
