import React from 'react';

import './CopyButton.css';

import PropTypes from 'prop-types';

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
};

/**
 * @param {*} props
 * @return {JSX.Element}
 * @description Returns the copy button for Goldle.
 */
export default function CopyButton(props) {
  const text = props.text;
  const onClick = props.onClick;
  const id = props.id || '';

  return (
    <button className='copy-button' onClick={onClick} id={id}>
      {text}
    </button>);
}