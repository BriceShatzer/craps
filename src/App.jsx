import { useState } from 'react'
import diceLogo from '/dice.svg'
import './App.scss'



function App() {
  const [betMin, setBetMin] = useState(5);
  const [showInfo, setShowInfo] = useState(true);

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
      <a href="#" onClick={()=>setShowInfo(true)} className="showInfo"></a>
      <div className="page-title">
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
          <em>Minimum Bet</em>
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
            <td>{getPayout(6,5)}</td>
            <td>{getPayout(6,5)}</td>
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
      <div id="info" className={showInfo?'show':''}>
       <p> Determine the ideal bet amount to receive a whole number payout that aligns with the table's minimum bet requirement</p>
       <p>For instance, a $10 <a href="https://wizardofodds.com/games/craps/basics/#place" rel="noreferrer">Place Bet</a> on the *six* pays $11.67. The casino doesn't deal with change, so you would only receive $11. </p>
       <p>By utilizing this calculator, you can see that with a minimum bet of $10, you should wager $12 to ensure you receive a complete, even-dollar payout of $14.</p>
       <button 
        className="circle" 
        data-animation="simpleRotate" 
        data-remove="200" 
        onClick={(e)=>{
          setShowInfo(false);
        }}
      />
      </div>



    </>
  )
}

export default App
