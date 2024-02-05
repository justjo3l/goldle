import React from 'react';

import styles from './PlayButton.module.css';

import PropTypes from 'prop-types';

PlayButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

/**
 * @param {*} props
 * @return {JSX.Element}
 * @description Returns the play button for Goldle.
 */
export default function PlayButton(props) {
  const text = props.text;
  const onClick = props.onClick;

  return (
    <button className={styles.playButton} onClick={onClick}>
      {text}
    </button>);
}
