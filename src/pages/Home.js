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
  const [guesses, setGuesses] = useState(0);
  const [guessStates, setGuessStates] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [maxGuesses, setMaxGuesses] = useState(6);

  const updateGuessState = (newGuessState) => {
    setRecommendation('');
    setGuessStates([...guessStates, newGuessState.guessState]);
    setGuesses(guesses + 1);
    if (newGuessState.gameState) {
      setState(newGuessState.gameState);
    }
  };

  const guessError = (errorState) => {
    setRecommendation(errorState.recommendation);
  };

  const recommendationClick = () => {
    setRecommendation('');

    const element =
    <GuessBar
      goldle={goldle}
      onGuess={updateGuessState}
      onError={guessError}
      value={recommendation}
      id={'bar-' + (guesses + 1).toString()}
    />;

    activeRow.unmount();
    const rowNode = document.getElementById('r-' + (guesses + 1).toString());
    const row = ReactDOM.createRoot(rowNode);
    setActiveRow(row);
    row.render(element);
  };

  const resetGame = () => {
    setGuesses(0);
    setGuessStates([]);
    let i = 1;
    let rowNode = document.getElementById('r-' + i.toString());
    while (rowNode && rowNode.hasChildNodes()) {
      const newRowNode = rowNode.cloneNode(true);
      newRowNode.removeChild(newRowNode.childNodes[0]);
      rowNode.replaceWith(newRowNode);
      i += 1;
      rowNode = document.getElementById('r-' + i.toString());
    }
  };

  const handleStartClick = () => {
    globalGoldle = goldle;
    resetGame();
    goldle.startGame();
    setMaxGuesses(goldle.numGuesses);
    setState(goldle.getState());
  };

  useEffect(() => {
    const rowNode = document.getElementById('r-' + guesses.toString());
    if (guessStates.length > 0 && activeRow && rowNode && state !== 'inactive') {
      rowNode.style.gridTemplateColumns = '100%';
      const currentGuessState = guessStates[guesses - 1];

      activeRow.render(<GuessRow guessState={currentGuessState} numGuesses={guesses}/>);
    }
  }, [guessStates]);

  useEffect(() => {
    if (state === 'started') {
      const rowNode = document.getElementById('r-' + (guesses + 1).toString());
      const row = ReactDOM.createRoot(rowNode);
      setActiveRow(row);
      rowNode.style.gridTemplateColumns = '100%';

      const element =
      <GuessBar
        goldle={goldle}
        onGuess={updateGuessState}
        onError={guessError}
        id={'bar-' + (guesses + 1).toString()}
      />;

      row.render(element);
    }
  }, [state, guesses]);

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
          {state === 'started' && <h3 id='guesses'>{guesses + 1}/{maxGuesses}</h3>}
          {(state === 'won' || state === 'lost') &&
          <h3 id='guesses'>{guesses}/{maxGuesses}</h3>}
        </div>
        {state === 'inactive' &&
          <PlayButton text='start' onClick={handleStartClick} id='start-button' />
        }
        {state === 'started' && recommendation &&
        <div
          id='recommendation'>
          Did you mean
          <span onClick={recommendationClick} id='recommendation-name'>{recommendation}</span>
          ?
        </div>}
        {state === 'won' && <WinPopup state={state === 'won'} goldle={goldle}/>}
        {state === 'lost' && <LosePopup state={state === 'lost'} goldle={goldle}/>}
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
        {(state === 'won' || state === 'lost') && <PlayButton text='play again' onClick={handleStartClick} id='play-again-button' />}
      </main>
    </div>
  );
}