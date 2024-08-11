import React from 'react';

import WinPopup from "components/WinPopup/WinPopup.js";
import LosePopup from "components/LosePopup/LosePopup.js";

import '@testing-library/jest-dom'
import { describe, test, expect } from '@jest/globals';

import { render, fireEvent } from '@testing-library/react';

import Goldle from "backend/goldle.js";

import Home from 'pages/Home.js';

describe('testing Poopup', () => {

    test('WinPopup should close when close button is clicked', () => {
        const goldle = new Goldle(true);
        goldle.startGame();
        render(<WinPopup state={true} goldle={goldle} />);
        const closeButton = document.getElementById('close-button');
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(closeButton).not.toBeInTheDocument();
    });

    test('LosePopup should close when close button is clicked', () => {
        const goldle = new Goldle(true);
        goldle.startGame();
        render(<LosePopup state={true} goldle={goldle} />);
        const closeButton = document.getElementById('close-button');
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(closeButton).not.toBeInTheDocument();
    });

    test('HelpPopup should close when close button is clicked', () => {
        const goldle = new Goldle(true);
        goldle.startGame();
        render(<Home />);
        const helpButton = document.getElementsByClassName('help-button')[0];
        fireEvent.click(helpButton);
        const helpModal = document.getElementById('help-modal');
        const closeButton = document.getElementById('close-button');
        expect(helpModal).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(helpModal).not.toBeInTheDocument();
        expect(closeButton).not.toBeInTheDocument();
    });
});