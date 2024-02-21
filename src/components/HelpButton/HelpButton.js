import './HelpButton.css';

import React, { useState } from 'react';

import helpIcon from '../../assets/icons/help-icon.svg';

import HelpPopup from '../HelpPopup/HelpPopup';

import HelpContext from '../../utils/context';

/**
 * @return {JSX.Element}
 * @description Returns a help button for Goldle
 */
export default function HelpButton() {

  const [helpClicked, setHelpClicked] = useState(false);

  return (
    <div>
      <img src={helpIcon} alt="Help" className="help-button" onClick={() => setHelpClicked(!helpClicked)}/>
      {helpClicked &&
      <HelpContext.Provider value={setHelpClicked}>
        <HelpPopup />
      </HelpContext.Provider>
      }
    </div>
  );
}