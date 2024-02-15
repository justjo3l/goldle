import React, { useContext } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import 'styles/Popup.css';
import './HelpPopup.css';

import { HelpContext } from 'components/HelpButton/HelpButton';

/**
 * @return {JSX.Element}
 * @description Returns the help popup for Goldle.
 */
export default function HelpPopup() {

  const setHelpClicked = useContext(HelpContext);

  const updateHelpClicked = () => {
    setHelpClicked(false);
  };

  return (
    <Popup open={true}
      contentStyle={{
        padding: 0,
        border: 'none',
        height: 'max(45%, min-content)',
        width: '60%',
      }}
      modal nested onClose={updateHelpClicked}>
      {
        (close) => (
          <div className='modal' id='help-modal'>
            <div>
              <button onClick={() => close()} id='close-button'>
                &times;
              </button>
            </div>
            <div id='modal-content'>
              <div>How to play</div>
            </div>
          </div>
        )
      }
    </Popup>);
}