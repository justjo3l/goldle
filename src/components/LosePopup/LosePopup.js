import React from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import '../../styles/Popup.css';
import './LosePopup.css';

import PropTypes from 'prop-types';

LosePopup.propTypes = {
  state: PropTypes.bool.isRequired,
  goldle: PropTypes.object.isRequired,
};

/**
 * @param {*} props
 * @return {JSX.Element}
 * @description Returns the lose popup for Goldle.
 */
export default function LosePopup(props) {
  const open = props.state;
  const goldle = props.goldle;

  return (
    <Popup open={open}
      contentStyle={{
        padding: 0,
        border: 'none',
        height: '50%',
        width: '45%',
      }}
      modal nested>
      {
        (close) => (
          <div className='modal' id='lose-modal'>
            <div>
              <button onClick={() => close()} id='close-button'>
                &times;
              </button>
            </div>
            <div id='modal-content'>
              <div>Better luck next time!</div>
              <div>The Gator was</div>
              <div id='gator'>{goldle.runCrew.getGuessGator().name}</div>
            </div>
          </div>
        )
      }
    </Popup>);
}