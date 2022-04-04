import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [data, setData] = useState(false);
  const [ville, setVille] = useState('Paris');

  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&lang=fr&units=metric&appid=99099fa059ead1aff1af09ea82b3cffa`)
    .then(response => response.json())
    .then(json => {

      if(json.cod === '400'){
        setError('400')
      }else if(json.cod === '404'){
        setError('404')
      }else{
        setData(json);
        setError(false)
      }
    });
    console.log('ville', data);
  }, [ville]);

  const handleInput = (event) => {
    setVille(event);
  }


  return (
    <div className="App">
      <div className="c-input">
        <h1>Choississez votre ville</h1>
        <input type="text" name="ville" value={ville} onChange={(event) => handleInput(event.target.value)}/>
      </div>

      <div className="c-result">
        {
          error === 400 ? <p>Veuillez renseigner une ville !</p> : <Weather data={data} error={error}/>
        }
        </div>
    </div>
  );
}

function Weather({data, error}){
  return(
    <>
    {
      error === '404' ?
      <p>Oupsss nous n'avons pas trouvé la ville que vous chercher sorry !!</p>
      :
      <div>
        <p>Il fait {data.main.temp}°C à {data.name}</p>
        <p>L'humidité est de {data.main.humidity}%</p>
        <p>Le temps actuel est : {data.weather[0].description}
          <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="img"/>
      </p>
      </div>
    }
    </>
  )
}

export default App;
