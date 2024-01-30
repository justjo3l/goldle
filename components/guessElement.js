import React, { useEffect, useState } from 'react';

import styles from '../styles/GuessElement.module.css';

import { getCountryEmoji } from '../utils/helper.js';

export default function GuessElement(props) {
    const guess = props.guess;
    const key = props.guessKey;
    const id = props.id;
    
    const [flipState, setFlipState] = useState(false);

    const flip = () => {
      if (guess.state !== 'correct') {
        setFlipState(!flipState);
      }
    }

    const getStyles = (guessVal) => {
        if (guessVal.state === 'correct') {
          return `${styles.ele} ${styles.correct}`;
        } else if (guessVal.state === 'neighbour' || guessVal.state === 'same-continent' || guessVal.state === 'same-faculty') {
          return `${styles.ele} ${styles.near}`;
        } else {
          return `${styles.ele}`;
        }
    }

    const getKeyStyles = () => {
        if (key.includes('country')) {
          return `${styles.country}`;
        } else if (key.includes('floor')) {
          return `${styles.floor}`;
        } else {
          return '';
        }
    }
    
    const getValue = (guessVal) => {
        if (key.includes('country')) {
          return getCountryEmoji(guessVal.value);
        } else {
          return guessVal.value;
        }
    }
    
    return (
        <div className={`${getStyles(guess)} ${getKeyStyles()} ${guess.state}`} id={id} onClick={flip}>
          {
            flipState ?
            (<div className={styles.hint}>
              {guess.hint}
            </div>)
            :
            getValue(guess)
          }
        </div>
    );
}