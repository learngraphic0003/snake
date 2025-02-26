import React, { useState } from 'react';
import './App.css';

const Dice = () => {
  const [result, setResult] = useState('');
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');

  const Goti = () => {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    setResult(`You rolled: ${diceValue}`);

    const xRotation = Math.floor(Math.random() * 4 + 1) * 90;
    const yRotation = Math.floor(Math.random() * 4 + 1) * 90;

    setTransform(`rotateX(${xRotation}deg) rotateY(${yRotation}deg)`);

    setTimeout(() => {
      switch (diceValue) {
        case 1:
          setTransform('rotateX(0deg) rotateY(0deg)');
          break;
        case 2:
          setTransform('rotateX(0deg) rotateY(-90deg)');
          break;
        case 3:
          setTransform('rotateX(0deg) rotateY(180deg)');
          break;
        case 4:
          setTransform('rotateX(0deg) rotateY(90deg)');
          break;
        case 5:
          setTransform('rotateX(-90deg) rotateY(0deg)');
          break;
        case 6:
          setTransform('rotateX(90deg) rotateY(0deg)');
          break;
        default:
          break;
      }
    }, 1500);
  };

  return (
    <>
      <div className="container">
        <div className="dice" id="dice" style={{ transform }}>
          <div className="face face-1">1</div>
          <div className="face face-2">2</div>
          <div className="face face-3">3</div>
          <div className="face face-4">4</div>
          <div className="face face-5">5</div>
          <div className="face face-6">6</div>
        </div>
        <button id="roll-button" onClick={Goti}>Roll Dice</button>
        <p id="result">{result}</p>
      </div>
      
    </>
  );
};

export default Dice;
