import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home, { getGoldle } from '../pages/index.js';

import '@testing-library/jest-dom';

describe('testing start stage in Home', () => {

    let startButton;

    beforeEach(() => {
        render(<Home />);
        startButton = screen.getByText('START');
    });

    describe('testing pre-game start screen', () => {
        test('start stage should render start button', () => {
            expect(startButton).toBeInTheDocument();
        });
    });

    describe('testing post-game start stage', () => {

        beforeEach(() => {
            fireEvent.click(startButton);
        });
        
        test('clicking start button should start game', () => {
            expect(startButton).not.toBeInTheDocument();
        });

        test('start stage should render number of guesses', () => {
            const guesses = screen.getByText('1/6');
            expect(guesses).toBeInTheDocument();
        });

        test('start stage should render main guess grid', () => {
            const guessGrid = document.getElementById('guess-grid');
            expect(guessGrid).toBeInTheDocument();
        });
    });
});

describe('testing guess-grid game flow in Home', () => {
    
    let startButton;
    let guessGrid;
    let goldle;

    beforeEach(() => {
        render(<Home />);
        startButton = screen.getByText('START');
        fireEvent.click(startButton);
        guessGrid = document.getElementById('guess-grid');
        goldle = getGoldle();
        goldle.rigGame("Joel Jose");
    });

    test('guess grid has first guess bar rendered', () => {
        const guessBar = document.getElementById('bar-1');
        expect(guessBar).toBeInTheDocument();
    });

    test('guess grid has renders next guess bar on incorrect guess', () => {
        let guessBar = document.getElementById('guessBar');
        fireEvent.change(guessBar, {target: {value: 'Amber Chan'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        guessBar = document.getElementById('bar-2');
        expect(guessBar).toBeInTheDocument();
    });

    test('guess grid should not render next guess bar on correct guess', () => {
        let guessBar = document.getElementById('guessBar');
        fireEvent.change(guessBar, {target: {value: 'Joel Jose'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        guessBar = document.getElementById('bar-2');
        expect(guessBar).not.toBeInTheDocument();
    });

    test('guess grid should not render next guess bar on all failed guesses', () => {
        let guessBar;
        for (let i = 0; i < 6; i++) {
            guessBar = document.getElementById('guessBar');
            fireEvent.change(guessBar, {target: {value: 'Amber Chan'}});
            fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        }
        guessBar = document.getElementById('guessBar');
        expect(guessBar).not.toBeInTheDocument();
    });
});