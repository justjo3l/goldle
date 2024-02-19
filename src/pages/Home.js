import '../styles/Home.css';
import '../components/GuessElement/GuessElement.css';

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

import Goldle from '../backend/goldle.js';

import WinPopup from '../components/WinPopup/WinPopup.js';
import LosePopup from '../components/LosePopup/LosePopup.js';

import GuessBar from '../components/GuessBar/GuessBar.js';
import GuessRow from '../components/GuessRow/GuessRow.js';
import PlayButton from '../components/PlayButton/PlayButton.js';
import HelpButton from 'components/HelpButton/HelpButton';

let globalGoldle;

/**
 * @return {Goldle}
 * @description Returns the global Goldle object.
 */
export function getGoldle() {
  return globalGoldle;
}

/**
 * @return {JSX.Element}
 * @description Returns the home page for Goldle.
 */
export default function Home() {
  const [state, setState] = useState('inactive');
  const [goldle] = useState(new Goldle());
  const [guessStates, setGuessStates] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [maxGuesses, setMaxGuesses] = useState(6);
  const [gameEnded, setGameEnded] = useState(false);
  
  const handleGameEndStyles = (gameState) => {
    const title = document.getElementById('title');
    if (gameState === 'won' || gameState === 'lost') {
      title.classList.add('on-' + gameState);
    } else {
      if (title.classList.contains('on-won')) {
        title.classList.remove('on-won');
      } else if (title.classList.contains('on-lost')) {
        title.classList.remove('on-lost');
      }
    }
  }

  // Runs when a valid guess is made.
  const updateGuessState = (newGuessState) => {
    setRecommendation('');
    setGuessStates([...guessStates, newGuessState.guessState]);
    if (newGuessState.gameState) {
    setState(newGuessState.gameState);
    handleGameEndStyles(newGuessState.gameState);
    setTimeout(() => {
      setGameEnded(true);
    }, 2000);
    }
  };

  // Runs when an invalid guess is made.
  const guessError = (errorState) => {
    setRecommendation(errorState.recommendation);
  };

  // Runs when a recommendation is clicked.
  const recommendationClick = () => {
    setRecommendation('');

    activeRow.unmount();
    const rowNode = document.getElementById('r-' + (guessStates.length + 1).toString());
    const row = ReactDOM.createRoot(rowNode);
    setActiveRow(row);
    row.render(<GuessBar
      goldle={goldle}
      onGuess={updateGuessState}
      onError={guessError}
      value={recommendation}
      id={'bar-' + (guessStates.length + 1).toString()}
    />);
  };

  // Runs when the game is reset.
  const resetGame = () => {
    globalGoldle = goldle;
    setGuessStates([]);
    setGameEnded(false);
    let i = 1;
    let rowNode = document.getElementById('r-' + i.toString());
    while (rowNode && rowNode.hasChildNodes()) {
      const newRowNode = rowNode.cloneNode(true);
      newRowNode.removeChild(newRowNode.childNodes[0]);
      rowNode.replaceWith(newRowNode);
      i += 1;
      rowNode = document.getElementById('r-' + i.toString());
    }
    handleGameEndStyles();
  };

  // Runs when the start button is clicked.
  const handleStartClick = () => {
    resetGame();
    goldle.startGame();
    setMaxGuesses(goldle.numGuesses);
    setState(goldle.getState());
  };

  // Runs whenever a change to the guessStates array is made.
  useEffect(() => {

    const rowNode = document.getElementById('r-' + guessStates.length.toString());

    // Runs when a guess is made.
    if (guessStates.length > 0) {
      rowNode.style.gridTemplateColumns = '100%';
      const currentGuessState = guessStates[guessStates.length - 1];

      activeRow.render(<GuessRow guessState={currentGuessState} numGuesses={guessStates.length}/>);
    }

    // Runs when a guess is made or the game is reset.
    if (state === 'started') {
      const rowNode = document.getElementById('r-' + (guessStates.length + 1).toString());
      const row = ReactDOM.createRoot(rowNode);
      setActiveRow(row);
      rowNode.style.gridTemplateColumns = '100%';

      const element =
      <GuessBar
        goldle={goldle}
        onGuess={updateGuessState}
        onError={guessError}
        id={'bar-' + (guessStates.length + 1).toString()}
      />;

      row.render(element);
    }

  }, [state, guessStates]);

  return (
    <div id='home'>
      <header>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <meta title="og:title" content="Goldle" />
        <meta title="og:description" content="The Goldstein College Guessing Game" />
        <meta title="og:url" content="https://goldle-b45c53352e44.herokuapp.com" />
        <title>Goldle</title>
      </header>
      <main>
        <div className='title-bar'>
          <div></div>
          <h1 id='title'>GOLDLE</h1>
          {state === 'started' && <h3 id='guesses'>{guessStates.length + 1}/{maxGuesses}</h3>}
          {(state === 'won' || state === 'lost') &&
          <h3 id='guesses'>{guessStates.length}/{maxGuesses}</h3>}
        </div>
        {state === 'inactive' &&
          <PlayButton text='start' onClick={handleStartClick} id='start-button' />
        }
        {recommendation &&
        <div
          id='recommendation'>
          {'Did you mean '}
          <span onClick={recommendationClick} id='recommendation-name'>{recommendation}</span>
          ?
        </div>}
        {state === 'won' && <WinPopup state={gameEnded} goldle={goldle}/>}
        {state === 'lost' && <LosePopup state={gameEnded} goldle={goldle}/>}
        {state !== 'inactive' &&
                <div id='guess-grid'>
                  <div className='header row' id="r-0">
                    <div className='ele'>GATOR</div>
                    <div className='ele'>DEGREE</div>
                    <div className='ele'>COUNTRY</div>
                    <div className='ele'>FLOOR</div>
                  </div>
                  {Array.from(Array(maxGuesses).keys()).map((num) => {
                    return <div className='row-container' id={`r-${num + 1}`} key={num}></div>;
                  })}
                </div>
        }
        {gameEnded && <PlayButton text='play again' onClick={handleStartClick} id='play-again-button' />}
        {!gameEnded && <section id='help-section'><HelpButton /></section>}
      </main>
    </div>
  );
}