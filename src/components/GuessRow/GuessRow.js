import React from 'react';

import GuessElement from '../GuessElement/GuessElement.js';

import './GuessRow.css';

import PropTypes from 'prop-types';

GuessRow.propTypes = {
  guessState: PropTypes.object.isRequired,
  numGuesses: PropTypes.number.isRequired
};

/**
 * @param {*} props
 * @return {JSX.Element}
 * @description Returns the guess element for Goldle.
 */
export default function GuessRow(props) {
  const guessState = props.guessState;
  const numGuesses = props.numGuesses;

  const idPrefix = `row-${numGuesses.toString()}`

  return (
    <div className='row' id={'row-' + numGuesses.toString()}>
      <GuessElement guess={guessState.name} id={idPrefix + '-name'} guessKey='name' />
      <GuessElement guess={guessState.degree} id={idPrefix + '-degree'} guessKey='degree' />
      <GuessElement guess={guessState.country} id={idPrefix + '-country'} guessKey='country' />
      <GuessElement guess={guessState.floor} id={idPrefix + '-floor'} guessKey='floor' />
    </div>
  );
}