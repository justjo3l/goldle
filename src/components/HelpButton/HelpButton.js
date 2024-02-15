import './HelpButton.css';

import React, { useState, createContext } from 'react';

import helpIcon from '../../assets/icons/help-icon.svg';

import HelpPopup from '../HelpPopup/HelpPopup';

export const HelpContext = createContext();

/**
 * @return {JSX.Element}
 * @description Returns a help button for Goldle
 */
export default function HelpButton() {

  const [helpClicked, setHelpClicked] = useState(false);

  return (
    <div>
      <img src={helpIcon} alt="Help" id="help-button" onClick={() => setHelpClicked(!helpClicked)}/>
      {helpClicked &&
      <HelpContext.Provider value={setHelpClicked}>
        <HelpPopup />
      </HelpContext.Provider>
      }
    </div>
  );
}