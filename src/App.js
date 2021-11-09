import { useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


const App = () => {
  //de quien es el turno
  const [turn, setTurn] = useState('X');
  //que contiene la cuadricula
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });

  const reset = () => {
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  }

  //comprobar si el estado actual es ganador
  const checkForWinner = newSquares => {
    for(let i = 0; i < winningPositions.length; i++) {
      //DELICADO guardar un array en 3 variables en un array
      const [a,b,c] = winningPositions[i];
      // console.log([a,b,c])
      // console.log('newSquares',newSquares)
      if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        // console.log('new squares on winning', newSquares)
        endGame(newSquares[a], winningPositions[i]);
        return
      }
    }
  // si en la cuadricula no hay vacios
    if(!newSquares.includes(null)) {
      endGame(null, Array.from(Array(10).keys()));
      return
    }
    setTurn(turn === 'X' ? 'O' : 'X');
  }


  //accion de clickar en recuadro
  const handleClick = square => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);
    checkForWinner(newSquares);
  }

  const endGame = (result, winningPositions) => {
    //reset turn
    setTurn(null);
    console.log('result',result)
    if(result !== null) {
      setScore({
        ...score,
        [result]: score[result] + 1,
      })
    }
    setWinningSquares(winningPositions);
    setTimeout(reset, 2000);
  }

  return (
    <div className="container">
      <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
}

export default App;
