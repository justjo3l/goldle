import Head from 'next/head';
import styles from '../styles/Home.module.css';
import eleStyles from '../components/GuessElement/GuessElement.module.css';

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

import GuessBar from '../components/GuessBar/guessBar.js';

import Goldle from '../backend/goldle.js';

import WinPopup from '../components/WinPopup/winPopup.js';
import LosePopup from '../components/LosePopup/losePopup.js';

import GuessElement from '../components/GuessElement/guessElement.js';

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
  const [winPopupOpen, setWinPopupOpen] = useState(false);
  const [losePopupOpen, setLosePopupOpen] = useState(false);
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

  const handleStartClick = () => {
    globalGoldle = goldle;
    goldle.startGame();
    setMaxGuesses(goldle.numGuesses);
    setState(goldle.getState());
  };

  useEffect(() => {
    const rowNode = document.getElementById('r-' + guesses.toString());
    if (rowNode && state !== 'inactive') {
      rowNode.style.gridTemplateColumns = '100%';
      const currentGuessState = guessStates[guesses - 1];

      activeRow.render(<div className={styles.row} id={'row-' + guesses.toString()}>
        <GuessElement guess={currentGuessState.name} id={`row-${guesses.toString()}-name`} guessKey='name' />
        <GuessElement guess={currentGuessState.degree} id={`row-${guesses.toString()}-degree`} guessKey='degree' />
        <GuessElement guess={currentGuessState.country} id={`row-${guesses.toString()}-country`} guessKey='country' />
        <GuessElement guess={currentGuessState.floor} id={`row-${guesses.toString()}-floor`} guessKey='floor' />
      </div>);
    }
  }, [guessStates]);

  useEffect(() => {
    if (state === 'won') {
      setWinPopupOpen(true);
    } else if (state === 'lost') {
      setLosePopupOpen(true);
    } else if (state === 'started') {
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
    <div className={styles.home}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <meta title="og:title" content="Goldle" />
        <meta title="og:description" content="The Goldstein College Guessing Game" />
        <meta title="og:url" content="https://goldle-b45c53352e44.herokuapp.com" />
        <title>Goldle</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.titleBar}>
          <div></div>
          <h1 className={styles.title} id='title'>GOLDLE</h1>
          {state === 'started' && <h3 className={styles.guesses} id='guesses'>{guesses + 1}/{maxGuesses}</h3>}
          {(state === 'won' || state === 'lost') &&
          <h3 className={styles.guesses} id='guesses'>{guesses}/{maxGuesses}</h3>}
        </div>
        {state === 'inactive' &&
                <button className={styles.startButton} onClick={handleStartClick}>START</button>
        }
        {state === 'started' && recommendation &&
        <div
          className={styles.recommendation}
          id='recommendation'>
          Did you mean
          <span onClick={recommendationClick} id='recommendation-name'>{recommendation}</span>
          ?
        </div>}
        {state !== 'inactive' && <WinPopup state={winPopupOpen} goldle={goldle}/>}
        {state !== 'inactive' && <LosePopup state={losePopupOpen} goldle={goldle}/>}
        {state !== 'inactive' &&
                <div className={styles.guessGrid} id='guess-grid'>
                  <div className={`${styles.header} ${styles.row}`} id="r-0">
                    <div className={eleStyles.ele}>GATOR</div>
                    <div className={eleStyles.ele}>DEGREE</div>
                    <div className={eleStyles.ele}>COUNTRY</div>
                    <div className={`${eleStyles.ele} ${eleStyles.eleEnd}`}>FLOOR</div>
                  </div>
                  {Array.from(Array(maxGuesses).keys()).map((num) => {
                    return <div className={styles.rowContainer} id={`r-${num + 1}`} key={num}></div>;
                  })}
                </div>
        }
      </main>

      <style>{`
                html,
                body {
                padding: 0;
                margin: 0;
                background-color: #151111;
                font-family:
                    -apple-system,
                    BlinkMacSystemFont,
                    Segoe UI,
                    Roboto,
                    Oxygen,
                    Ubuntu,
                    Cantarell,
                    Fira Sans,
                    Droid Sans,
                    Helvetica Neue,
                    sans-serif;
                }
                * {
                box-sizing: border-box;
                }
            `}</style>
    </div>
  );
}
