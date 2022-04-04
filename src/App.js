import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState(false);
  const [ville, setVille] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    setData(data);
  }, [ville]);

  const handleInput = (event) => {
    if(event.key === 'Enter'){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&lang=fr&units=metric&appid=99099fa059ead1aff1af09ea82b3cffa`)
      .then(response => response.json())
      .then(json => {

        if(json.cod === '400'){
          setError('400');
        }else if(json.cod === '404'){
          setError('404');
        }else{
          setData(json);
          setVille('');
          setError(false);
        }
      });
    }
  }


  return (
    <div className="App">
      <div className="card container" style={{width: '50%', minHeight: '200px'}}>
        <div className="card-body">
          <h1>Choississez votre ville</h1>

          <div class="col-auto">
            <input type="text" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" name="ville" value={ville} placeholder="Entrez une ville..." onChange={(event) => setVille(event.target.value)} onKeyPress={handleInput} />
          </div>
        </div>
      </div>

      {
        data === false ?
        <h1>Veuillez renseigner une ville !</h1>
        :
        <div className="c-result">
          {
            error === '400' ? <h1>Donner nous une ville à chercher 👻</h1> : <Weather data={data} error={error}/>
          }
        </div>
      }

    </div>
  );
}

const Weather = ({data, error}) => {
  return(
    <>
    {
      error === '404' ?
      <h1>Oupsss ... 🤭 <br/> Nous n'avons pas trouvé la ville que vous chercher 🤷‍♂️</h1>
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
