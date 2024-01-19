import Head from 'next/head';
import styles from '../styles/Home.module.css';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import GuessBar from '../components/guessBar';

import Goldle from '../../backend.js';

export default function Home() {

  const [state, setState] = useState('inactive');
  const [goldle, setGoldle] = useState(new Goldle());
  const [guesses, setGuesses] = useState(0);
  const [guessStates, setGuessStates] = useState([]);

  const updateGuessState = (newGuessState) => {
    setGuessStates([...guessStates, newGuessState.guessState]);
    setGuesses(guesses + 1);
    if (newGuessState.gameState) {
      setState(newGuessState.gameState);
    }
  }

  const handleStartClick = () => {
    goldle.setupGators();
    goldle.startGame();
    setState(goldle.getState());
  }

  const getStyles = (guessStateVal) => {
    if (guessStateVal.state === 'correct') {
      return `${styles.ele} ${styles.correct}`;
    } else if (guessStateVal.state === 'neighbour' || guessStateVal.state === 'same continent' || guessStateVal.state === 'same faculty') {
      return `${styles.ele} ${styles.near}`;
    } else {
      return `${styles.ele}`;
    }
  }

  useEffect(() => {
    if (state !== 'inactive') {
      const rowNode = document.getElementById('r-' + guesses.toString());
      const row = ReactDOM.createRoot(rowNode);
      rowNode.style.gridTemplateColumns = '100%';
      const currentGuessState = guessStates[guesses - 1];

      console.log(getStyles(currentGuessState.degree));
      row.render(<div className={styles.row}>
      <div className={`${getStyles(currentGuessState.name)}`}>{currentGuessState.name.value}</div>
      <div className={`${getStyles(currentGuessState.degree)}`}>{currentGuessState.degree.value}</div>
      <div className={`${getStyles(currentGuessState.country)}`}>{currentGuessState.country.value}</div>
      <div className={`${getStyles(currentGuessState.floor)} ${styles.floor}`}>{currentGuessState.floor.value}</div>
      </div>);
    }
    console.log(guessStates);
  }, [guessStates])

  useEffect(() => {
    if (state !== 'inactive') {
      const rowNode = document.getElementById('r-' + (guesses + 1).toString());
      if (rowNode && state === 'started') {
        const row = ReactDOM.createRoot(rowNode);
        rowNode.style.gridTemplateColumns = '100%';
        const element = <GuessBar goldle={goldle} onGuess={updateGuessState}/>;
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
        <h1 className={styles.title}>GOLDLE</h1>
        {state === 'inactive' &&
        <button className={styles.startButton} onClick={handleStartClick}>START</button>
        }
        {state !== 'inactive' && 
        <div className={styles.guessGrid}>
          <div className={`${styles.header} ${styles.row}`} id="r-0">
            <div className={styles.ele}>GATOR</div>
            <div className={styles.ele}>DEGREE</div>
            <div className={styles.ele}>COUNTRY</div>
            <div className={`${styles.ele} ${styles.eleEnd}`}>FLOOR</div>
          </div>
          <div className={styles.rowContainer} id="r-1"></div>
          <div className={styles.rowContainer} id="r-2"></div>
          <div className={styles.rowContainer} id="r-3"></div>
          <div className={styles.rowContainer} id="r-4"></div>
          <div className={styles.rowContainer} id="r-5"></div>
          <div className={styles.rowContainer} id="r-6"></div>
        </div>
        }
      </main>

      <style jsx global>{`
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
