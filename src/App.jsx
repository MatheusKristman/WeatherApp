import React, { useState } from 'react';
import './css/styles.css';
import Logo from './assets/logo.svg';

const api = {
  key: '452913c43cbf5c48577ccc6d53893c09',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
        });
    }
  };

  const dateBuilder = (dateParam) => {
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'];

    let day = days[dateParam.getDay()];
    let date = dateParam.getDate();
    let month = months[dateParam.getMonth()];
    let year = dateParam.getFullYear();

    return `${day}, ${date} de ${month} de ${year}`;
  };

  return (
    <div className={typeof weather.main != 'undefined' ? (weather.main.temp > 16 ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Procurar...'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°c</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <h2 className='weather-empty'>Digite acima para pesquisar</h2>
        )}
      </main>

      <div className='header'>
        <div className='header__container'>
          <a className='logo-container' href='https://portfolio-2-0-iota-henna.vercel.app/' target="_blank" rel="noreferrer noopener">
            <img src={Logo} alt='Logo' className='logo' />
          </a>

          <ul className='socials'>
            <li>
              <a className='linkedin' href='https://www.linkedin.com/in/matheus-kristman/' target='_blank' rel='noreferrer noopener'>
                <i class='fa-brands fa-linkedin'></i>
              </a>
            </li>
            <li>
              <a className='instagram' href='https://www.instagram.com/tinzin.exe/' target='_blank' rel='noreferrer noopener'>
                <i class='fa-brands fa-instagram'></i>
              </a>
            </li>
            <li>
              <a className='github' href='https://github.com/MatheusKristman' target='_blank' rel='noreferrer noopener'>
                <i class='fa-brands fa-github'></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
