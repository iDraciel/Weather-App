import React, { useState } from 'react';
import './App.css';
import Animation from './Animation/Animation';
const api = {
  key:'8a0fdb931ee82df90640a009085b5f4a',
  base:'https://api.openweathermap.org/data/2.5/'
}
function App() {
  const [query,setQuery]= useState('');
  const [weather,setWeather]= useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result =>{
         setQuery('');
         setWeather(result);
         console.log(result)
      });
    }
  }

  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();


    return `${day} ${date} ${month} ${year} ` 
  }
  return (
    <div className={(typeof weather.main !== "undefined") 
    ? ((weather.main.temp) < 10 ? 'App cold' : 'App' ) 
    : 'App' }>
    <main>
      <div className="search-box">
        <input type="text" className="search-bar" placeholder="search..." onChange={e => setQuery(e.target.value)} value={query}
        onKeyPress={search} />
      </div>
      {(typeof weather.main !== "undefined") ? (
         <div>
        <div className="location-box">
  <div className="location">{weather.name}, {weather.sys.country}</div>
  <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className='weather-box'>
          <div className="temp">
            {(weather.main.temp_min)}°c
      <p className="temp-min">Low-{(weather.main.temp_min)}°c    Max-{(weather.main.temp_max)}°c</p>
      <p className="temp-max">Feels like-{(weather.main.feels_like)}°c</p>
          </div>
          <div className="weather">
            {weather.weather[0].description}
          </div> 
          <div className="wind">
            Wind Speed-{weather.wind.speed} KM
          </div>
        </div>
        <Animation/>
        </div>
      ) : ('')} 

    </main>
    </div>
  );
}

export default App;
