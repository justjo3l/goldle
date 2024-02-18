import React, { useContext } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import 'styles/Popup.css';
import './HelpPopup.css';

import { HelpContext } from 'components/HelpButton/HelpButton';

import degreeExample from 'assets/help-assets/goldle-h-1.png';
import countryExample from 'assets/help-assets/goldle-h-2.png';
import floorExample from 'assets/help-assets/goldle-h-3.png';
import successExample from 'assets/help-assets/goldle-h-4.png';

/**
 * @return {JSX.Element}
 * @description Returns the help popup for Goldle.
 */
export default function HelpPopup() {

  const setHelpClicked = useContext(HelpContext);

  return (
    <Popup open={true}
      contentStyle={{
        padding: 0,
        border: 'none',
        boxShadow: '0px 0px 5px 0px #FFFFFF',
        height: 'min-content',
        width: '90%',
        margin: 'auto'
      }}
      modal nested onClose={() => setHelpClicked(false)}>
      {
        (close) => (
          <div className='modal' id='help-modal'>
            <div id='modal-header'>
              <div></div>
              <div>
                <h4 className='modal-content-title'>How to Play</h4>
              </div>
              <button onClick={() => close()} id='close-button'>
                &times;
              </button>
            </div>
            <div id='help-modal-content'>
              <h6 className='modal-content-main-text'>The objective of the game is to guess the <b>mystery gator</b> by guessing gators across Goldie!</h6>
              <p>If you guess a degree in the same faculty as the mystery gator, it will be yellow.</p>
              <img src={degreeExample} alt='Same Faculty Degree Example' className='modal-content-example-image' />
              <p>If you guess a country in the same continent as the mystery gator, it will be yellow.</p>
              <img src={countryExample} alt='Same Continent Country Example' className='modal-content-example-image' />
              <p>If you guess a floor that neighbours the mystery gator&apos;s floor, it will be yellow.</p>
              <img src={floorExample} alt='Neighbouring Floor Example' className='modal-content-example-image' />
              <p>If you guess the mystery gator correctly, then you win!</p>
              <img src={successExample} alt='Correct Guess Example' className='modal-content-example-image' />
              <p>Good luck and have fun!</p>
            </div>
          </div>
        )
      }
    </Popup>);
}