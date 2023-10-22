import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

function thing () {
  return(
    <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src={viteLogo} className="logo" alt="Vite logo" />
    </a>
    <a href="https://react.dev" target="_blank">
      <img src={reactLogo} className="logo react" alt="React logo" />
    </a>
    <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
  </div>

  )
}


function App() {
  const [betMin, setBetMin] = useState(5);
  const [lockInput, setLockInput] = useState(false);

  function raw (value,num,dom) {
    return 'Bet of '+value+' pays: '+ (value * num) / dom;
  }

  function getPayout(oddsNumerator, oddsDenominator){
    function betPays(bet){
      return (<>
        <strong>{bet}</strong>
        <br/>
        {'pays: '+ (bet * oddsNumerator) / oddsDenominator}
      </>
      )
    }
    function hasUnevenPayout(bet){
      return (bet* oddsNumerator) % oddsDenominator>0
    }

    let payout;
    
    if(hasUnevenPayout(betMin)){
      let goodBet = betMin;

      for (var i = betMin; hasUnevenPayout(i); i++) {
        goodBet +=1   
      }
      payout = betPays(goodBet);
    } else {
      payout = betPays(betMin);
    }

    return payout;
  }
  
  

  return (
    <>

      <h1>Craps Calculator</h1>
      <div className="card">
        <button onClick={() => setBetMin((betMin) => betMin - 5)}>
          -5  
        </button>
        
        <h2>{betMin}</h2>
        
        <button onClick={() => setBetMin((betMin) => betMin + 5)}>
          +5
        </button>

      </div>
 
      <br />
      <div className="board">
        <table>
          <tbody>
          <tr>
            <th/>
            <th>4</th>
            <th>5</th>
            <th>Six</th>
            <th>8</th>
            <th>Nine</th>
            <th>10</th>
          </tr>
          <tr>
            <td>
              <strong>Pass Line Odds</strong>
              <p>Once a point is established you can bet on the Pass Line Odds</p>

            </td>
            <td>{getPayout(2,1)}</td>
            <td>{getPayout(3,2)}</td>
            <td>{getPayout(5,6)}</td>
            <td>{getPayout(5,6)}</td>
            <td>{getPayout(3,2)}</td>
            <td>{getPayout(2,1)}</td>
          </tr>
          <tr>
            <td>
              <strong>Place Bets</strong>
              <br />
              <p>Bet # will be rolled before seven after a point is established.</p>
            </td>
            <td>{getPayout(9,5)}</td>
            <td>{getPayout(7,5)}</td>
            <td>{getPayout(7,6)}</td>
            <td>{getPayout(7,6)}</td>
            <td>{getPayout(7,5)}</td>
            <td>{getPayout(9,5)}</td>
          </tr>
          </tbody>
        </table>

      </div>
    </>
  )
}

export default App
