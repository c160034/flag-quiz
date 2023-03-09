import './App.css';
import { useState } from 'react';
import Confetti from './Confetti';
import Countries from './Countries'
import Flag from './Flag'

function App() {
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([])
  const [score, setScore] = useState(-1);
  const [winningScore, setWinningScore] = useState();
  const [win, setWin] = useState(false);
  let dict = {};

  fetch('https://restcountries.com/v3.1/all')
    .then(res=>res.json())
    .then(data=>dict=data)

  function nextFlag() {
    const i = Math.floor(Math.random()*250);
    setCountryCode(dict[i].cca2.toLowerCase());
    setCountry(dict[i].name.common);
    const newCountries=[];
    newCountries.push(dict[i].name.common,
      dict[(i+3)%250].name.common,
      dict[(i+6)%250].name.common,
      dict[(i+9)%250].name.common);
    shuffle(newCountries);
    setCountries(newCountries);
  }

  function shuffle(arr) {
    for (let i=arr.length-1; i>0; i--) {
        const j=Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]]=[arr[j], arr[i]];
    }
  }

  function newGame(){
      if (winningScore>0){
        setWin(false);
        setScore(0);
        nextFlag();
      }
  }

  const selectAnswer = (e)=>{
    if (score===winningScore-1 && e.target.innerText===country) {
      setWin(true);
      setScore(-1);
    } else if (e.target.innerText===country) {
      setScore(score+1);
      nextFlag();
    } else if (e.target.innerText) {
      setScore(Math.max(score-1,0));
      e.target.innerText=""
    }
  }
  
  const handleChange = (event)=>{
    if (isNaN(parseInt(event.target.value))) setWinningScore('');
    else setWinningScore(parseInt(event.target.value));
  }

  return (
    <div className="App">
      <h1>Guess the country's flag</h1>
      {score===-1 || winningScore===0 ? 
        <>
        {win && <h1 className='Congrats'>Congratulations!</h1>}
        {win && <Confetti />}
        <h2>Winning Score: </h2>
        <input type='text' text-align='center' onChange={handleChange} value={winningScore}/>
        {!winningScore && <span>Please input a positive winning score.</span>}
        <button className="button" onClick={newGame}>New Game</button>
        </>
        : 
        <>
        <h2>{score}/{winningScore}</h2>
        <Flag countryCode={countryCode} />
        <Countries countries={countries} selectAnswer={selectAnswer}/>
        </>
      }
    </div>
  );
}

export default App;
