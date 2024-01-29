import Head from 'next/head';
import styles from '../styles/Home.module.css';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import GuessBar from '../components/guessBar';

import Goldle from '../backend/goldle.js';

import WinPopup from '../components/winPopup.js';
import LosePopup from '../components/losePopup.js';

import { getCountryEmoji } from '../utils/helper.js';

let globalGoldle;

export function getGoldle() {
  return globalGoldle;
}

export default function Home() {

  const [state, setState] = useState('inactive');
  const [goldle, setGoldle] = useState(new Goldle());
  const [guesses, setGuesses] = useState(0);
  const [guessStates, setGuessStates] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [winPopupOpen, setWinPopupOpen] = useState(false);
  const [losePopupOpen, setLosePopupOpen] = useState(false);
  const [maxGuesses, setMaxGuesses] = useState(6);

  const updateGuessState = (newGuessState) => {
    setRecommendation("");
    setGuessStates([...guessStates, newGuessState.guessState]);
    setGuesses(guesses + 1);
    if (newGuessState.gameState) {
      setState(newGuessState.gameState);
    }
  }

  const guessError = (errorState) => {
    setRecommendation(errorState.recommendation);
  }

  const recommendationClick = () => {
    setRecommendation("");
    const element = <GuessBar goldle={goldle} onGuess={updateGuessState} onError={guessError} value={recommendation} id={"bar-" + (guesses + 1).toString()}/>;
    activeRow.unmount();
    const rowNode = document.getElementById('r-' + (guesses + 1).toString());
    const row = ReactDOM.createRoot(rowNode);
    setActiveRow(row);
    row.render(element);
  }

  const handleStartClick = () => {
    globalGoldle = goldle;
    goldle.startGame();
    setMaxGuesses(goldle.numGuesses);
    setState(goldle.getState());
  }

  const getStyles = (guessStateVal) => {
    if (guessStateVal.state === 'correct') {
      return `${styles.ele} ${styles.correct}`;
    } else if (guessStateVal.state === 'neighbour' || guessStateVal.state === 'same-continent' || guessStateVal.state === 'same-faculty') {
      return `${styles.ele} ${styles.near}`;
    } else {
      return `${styles.ele}`;
    }
  }

  useEffect(() => {
    if (state !== 'inactive') {
      const rowNode = document.getElementById('r-' + guesses.toString());
      if (rowNode && state !== 'inactive') {
        rowNode.style.gridTemplateColumns = '100%';
        const currentGuessState = guessStates[guesses - 1];

        activeRow.render(<div className={styles.row} id={"row-" + guesses.toString()}>
        <div className={`${getStyles(currentGuessState.name)} ${currentGuessState.name.state}`} id={`row-${guesses.toString()}-name`}>{currentGuessState.name.value}</div>
        <div className={`${getStyles(currentGuessState.degree)} ${currentGuessState.degree.state}`} id={`row-${guesses.toString()}-degree`}>{currentGuessState.degree.value}</div>
        <div className={`${getStyles(currentGuessState.country)} ${styles.country} ${currentGuessState.country.state}`} id={`row-${guesses.toString()}-country`}>{getCountryEmoji(currentGuessState.country.value)}</div>
        <div className={`${getStyles(currentGuessState.floor)} ${styles.floor} ${currentGuessState.floor.state}`} id={`row-${guesses.toString()}-floor`}>{currentGuessState.floor.value}</div>
        </div>);
      }
    }
  }, [guessStates])

  useEffect(() => {
    if (state === 'won') {
      setWinPopupOpen(true);
    } else if (state === 'lost') {
      setLosePopupOpen(true);
    } else if (state !== 'inactive') {
      const rowNode = document.getElementById('r-' + (guesses + 1).toString());
      if (rowNode && state === 'started') {
        const row = ReactDOM.createRoot(rowNode);
        setActiveRow(row);
        rowNode.style.gridTemplateColumns = '100%';
        const element = <GuessBar goldle={goldle} onGuess={updateGuessState} onError={guessError} id={"bar-" + (guesses + 1).toString()}/>;
        row.render(element);
      }
    }
  }, [state, guesses]);

  return (
    <div className={styles.home}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <title>Goldle</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.titleBar}>
          <div></div>
          <h1 className={styles.title} id='title'>GOLDLE</h1>
          {state === 'started' && <h3 className={styles.guesses} id='guesses'>{guesses + 1}/{maxGuesses}</h3>}
          {(state === 'won' || state === 'lost') && <h3 className={styles.guesses} id='guesses'>{guesses}/{maxGuesses}</h3>}
        </div>
        {state === 'inactive' &&
        <button className={styles.startButton} onClick={handleStartClick}>START</button>
        }
        {state === 'started' && recommendation && <div className={styles.recommendation} id='recommendation'>Did you mean <span onClick={recommendationClick} id='recommendation-name'>{recommendation}</span>?</div>}
        {state !== 'inactive' && <WinPopup state={winPopupOpen} goldle={goldle}/>}
        {state !== 'inactive' && <LosePopup state={losePopupOpen} goldle={goldle}/>}
        {state !== 'inactive' &&
        <div className={styles.guessGrid} id='guess-grid'>
          <div className={`${styles.header} ${styles.row}`} id="r-0">
            <div className={styles.ele}>GATOR</div>
            <div className={styles.ele}>DEGREE</div>
            <div className={styles.ele}>COUNTRY</div>
            <div className={`${styles.ele} ${styles.eleEnd}`}>FLOOR</div>
          </div>
          {Array.from(Array(maxGuesses).keys()).map((num) => {
            return <div className={styles.rowContainer} id={`r-${num + 1}`} key={num}></div>
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
