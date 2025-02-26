import React, { useState, useEffect } from 'react';
import './App.css';

const a = prompt("Please enter first player's name");
const b = prompt("Please enter second player's name");

// Snake and Ladder game component
const App = () => {
  // Initialize the game state
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [player1Position, setPlayer1Position] = useState(0);
  const [player2Position, setPlayer2Position] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(a);
  const [message, setMessage] = useState('');
  const [mass, setMass] = useState('');
   const [result, setResult] = useState('start');

  // Snake and Ladder board configuration
  const snakes = {
    17: 4,
    54: 34,
    69: 19,
    67: 60,
    84: 27,
    93: 73,
    95: 75,
    99: 78,
  };

  const ladders = {
    2: 31,
    7: 14,
    20: 38,
    23: 87,
    40: 59,
    51: 64,
    68: 90,
    71: 91,
  };

  // Function to speak text
  const speak = (text) => {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
  };

  // Using useEffect to trigger the speech on page load
  useEffect(() => {
    speak(`Hello ${a} and ${b}, let's play!`);
  }, []);

  // Function to roll the dice and move the player
  const rollDice = () => {
    
    const dice = Math.floor(Math.random() * 6) + 1;
    setMessage(`You rolled: ${dice}`);
    setResult (` ${dice}` )
    
    const xRotation = Math.floor(dice) * 90;
    const yRotation = Math.floor(dice) * 90;
    setTransform(`rotateX(${xRotation}deg) rotateY(${yRotation}deg)`);

    setTimeout(() => {
      let newPosition = currentPlayer === a ? player1Position + dice : player2Position + dice;

      if (newPosition > 100) {
        setMessage("Game finished");
        speak("Game finished");
        return;
      }

      // Check for snakes
      if (snakes[newPosition]) {
        newPosition = snakes[newPosition];
        setMass(`Player ${currentPlayer === a ? a : b} hit a snake! Moving to position ${newPosition}`);
        speak(`Hit snake, ${currentPlayer === a ? a : b} go to position ${newPosition}`);
      }

      // Check for ladders
      if (ladders[newPosition]) {
        newPosition = ladders[newPosition];
        setMessage(`Player ${currentPlayer === a ? a : b} climbed a ladder! Moving to position ${newPosition}`);
        speak(`Climbed ladder, ${currentPlayer === a ? a : b} go to position ${newPosition}`);
      }

      // Update player position
      if (currentPlayer === a) {
        setPlayer1Position(newPosition);
      } else {
        setPlayer2Position(newPosition);
      }

      // Check for winner
      if (newPosition === 100) {
        setMessage(`${currentPlayer} wins!`);
        speak(`${currentPlayer} wins!`);
        return;
      }

      // Switch turns
      setCurrentPlayer(currentPlayer === a ? b : a);
    }, 1500);
  };

  // Function to render the board (100 squares)
  const renderBoard = () => {
    const board = [];
    for (let i = 100; i >= 1; i--) {
      const isSnake = snakes[i];
      const isLadder = ladders[i];
      const isPlayer1 = player1Position === i;
      const isPlayer2 = player2Position === i;

      board.push(
        <div
          key={i}
          className={`square ${isSnake ? 'snake' : ''} ${isLadder ? 'ladder' : ''} ${isPlayer1 ? 'player1' : ''} ${isPlayer2 ? 'player2' : ''}`}
        >
          {i}
        </div>
      );
    }
    return board;
  };

  return (
    <>
      <div className="game-container">
        <h1 className="text-blue-600 font-bold text-2xl">Snake and Ladder Game</h1>

        <div className="board">
          <div className="board-grid">{renderBoard()}</div>
          <div className="controls">
            <div className="player-info">
              <p>Player {a}: {player1Position}</p>
              <p>Player {b}: {player2Position}</p>
            </div>
            <button className="roll-button" onClick={rollDice}>
              Roll Dice ({currentPlayer})
            </button>
            <p className="message">{message}</p>
            <span className="text-red-600">{mass}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="dice" id="dice" style={{ transform }}>
          <div className="face face-1  ">  {result} </div>
          <div className="face face-2"> {result} </div>
          <div className="face face-3"> {result}</div>
          <div className="face face-4">{result}</div>
          <div className="face face-5"> {result}</div>
          <div className="face face-6">{result}</div>
        </div>
      </div>
    </>
  );
};

export default App;
