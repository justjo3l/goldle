import WinPopup from "../components/WinPopup/winPopup.js";
import LosePopup from "../components/LosePopup/losePopup.js";

import '@testing-library/jest-dom'

import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Goldle from "../backend/goldle.js";

describe('testing Popup', () => {

    test('WinPopup should close when close button is clicked', () => {
        const goldle = new Goldle();
        goldle.startGame();
        render(<WinPopup state={true} goldle={goldle} />);
        const closeButton = document.getElementById('close-button');
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(closeButton).not.toBeInTheDocument();
    });

    test('LosePopup should close when close button is clicked', () => {
        const goldle = new Goldle();
        goldle.startGame();
        render(<LosePopup state={true} goldle={goldle} />);
        const closeButton = document.getElementById('close-button');
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(closeButton).not.toBeInTheDocument();
    });
});