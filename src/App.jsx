import { useState } from 'react'
import diceLogo from '/dice.svg'
import './App.scss'



function App() {
  const [betMin, setBetMin] = useState(5);

  function updateBetMin(num) {
    const newNumber = betMin + num;
    if (newNumber<0){
      return setBetMin(0);
    }
    setBetMin(newNumber);
    
  }



  function getPayout(oddsNumerator, oddsDenominator){
    function betPays(bet){
      return (<>
        <strong>{bet}</strong><br />
        <span>{' pays: '+ (bet * oddsNumerator) / oddsDenominator}</span>
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
      <div class="page-title">
        <img src={diceLogo} className="logo" alt="Dice logo" />
        <h1>Craps Calculator</h1>
        <img src={diceLogo} className="logo" alt="Dice logo" />
      </div>
      <div className="table-min">
        <button onClick={() => updateBetMin(-5)}>
          -5  
        </button>
        
        <div>
          <h2>{betMin}</h2><br />
          <em>Miniumn Bet</em>
        </div>
        
        <button onClick={() => updateBetMin(5)}>
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
              <p>Bet that the established point will be rolled before a seven</p>
            </td>
            <td>{getPayout(2,1)}</td>
            <td>{getPayout(3,2)}</td>
            <td>{getPayout(5,6)}</td>
            <td>{getPayout(5,6)}</td>
            <td>{getPayout(3,2)}</td>
            <td>{getPayout(2,1)}</td>
          </tr>
          <tr id="dontPass">
            <td>
              <strong>Don't Pass Odds</strong>
              <p>Bet that a seven will be rolled before the established point</p>
            </td>
            <td>{getPayout(1,2)}</td>
            <td>{getPayout(2,3)}</td>
            <td>{getPayout(5,6)}</td>
            <td>{getPayout(5,6)}</td>
            <td>{getPayout(2,3)}</td>
            <td>{getPayout(1,2)}</td>
          </tr>          
          <tr>
            <td>
              <strong>Place Bets</strong>
              <p>Bet # will be rolled before seven after a point is established</p>
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
