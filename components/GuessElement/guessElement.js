import React, {useState} from 'react';

import styles from './GuessElement.module.css';

import {getCountryEmoji} from '../../utils/helper.js';

import PropTypes from 'prop-types';

GuessElement.propTypes = {
  guess: PropTypes.object.isRequired,
  guessKey: PropTypes.string.isRequired,
  id: PropTypes.string,
};

/**
 * @param {*} props
 * @return {JSX.Element}
 * @description Returns the guess element for Goldle.
 */
export default function GuessElement(props) {
  const guess = props.guess;
  const key = props.guessKey;
  const id = props.id || '';

  const [flipState, setFlipState] = useState(false);

  const flip = () => {
    if (guess.state !== 'correct') {
      setFlipState(!flipState);
    }
  };

  const getStyles = (guessVal) => {
    if (guessVal.state === 'correct') {
      return `${styles.ele} ${styles.correct}`;
    } else if (guessVal.state === 'neighbour' || guessVal.state === 'same-continent' || guessVal.state === 'same-faculty') {
      return `${styles.ele} ${styles.near}`;
    } else {
      return `${styles.ele}`;
    }
  };

  const getKeyStyles = () => {
    if (key.includes('country')) {
      return `${styles.country}`;
    } else if (key.includes('floor')) {
      return `${styles.floor}`;
    } else {
      return '';
    }
  };

  const getValue = (guessVal) => {
    if (key.includes('country')) {
      return getCountryEmoji(guessVal.value);
    } else {
      return guessVal.value;
    }
  };

  return (
    <div className={`${getStyles(guess)} ${getKeyStyles()} ${guess.state} guessEle`} id={id} onClick={flip}>
      {
            flipState ?
            (<div className={styles.hint}>
              {guess.hint}
            </div>) :
            getValue(guess)
      }
    </div>
  );
}
