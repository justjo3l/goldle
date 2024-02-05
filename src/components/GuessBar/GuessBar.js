import React, {useState} from 'react';

import './GuessBar.css';

import PropTypes from 'prop-types';

GuessBar.propTypes = {
  goldle: PropTypes.object.isRequired,
  onGuess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
};

/**
 * @param {*} props
 * @return {JSX.Element}
 * @description Returns the guess bar for Goldle.
 */
export default function GuessBar(props) {
  const goldle = props.goldle;
  const onGuess = props.onGuess;
  const onError = props.onError;
  const id = props.id || '';

  const [value, setValue] = useState(props.value || '');

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newGuessState = goldle.guessName(value);
      if (newGuessState.guessState) {
        onGuess(newGuessState);
      } else {
        onError(newGuessState);
      }
    }
  };

  return (
    <div className='guess-bar-container' id={id}>
      <input
        id='guess-bar'
        type="text"
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleSubmit}
        autoFocus />
    </div>
  );
}