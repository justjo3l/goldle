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
    let goldle;
    let runCrew;

    beforeEach(() => {
        render(<Home />);
        startButton = screen.getByText('START');
        fireEvent.click(startButton);
        goldle = getGoldle();
        goldle.rigGame("Joel Jose");
        runCrew = goldle.runCrew;
    });

    test('guess grid has first guess bar rendered', () => {
        const guessBar = document.getElementById('bar-1');
        expect(guessBar).toBeInTheDocument();
    });

    test('guess grid does not show recommendation if valid input', () => {
        const guessBar = document.getElementById('guessBar');
        fireEvent.change(guessBar, {target: {value: 'Amber Chan'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        const recommendationText = document.getElementById('recommendation');
        expect(recommendationText).not.toBeInTheDocument();
    });

    test('guess grid renders result row and next guess bar on incorrect guess', () => {
        let guessBar = document.getElementById('guessBar');
        fireEvent.change(guessBar, {target: {value: 'Amber Chan'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        const resultRow = document.getElementById('row-1');
        expect(resultRow).toBeInTheDocument();
        guessBar = document.getElementById('bar-2');
        expect(guessBar).toBeInTheDocument();
    });

    test('guess grid should render result row but not the next guess bar on correct guess', () => {
        let guessBar = document.getElementById('guessBar');
        fireEvent.change(guessBar, {target: {value: 'Joel Jose'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        const resultRow = document.getElementById('row-1');
        expect(resultRow).toBeInTheDocument();
        guessBar = document.getElementById('bar-2');
        expect(guessBar).not.toBeInTheDocument();
        const resultPopup = document.getElementById('result-popup');
        expect(resultPopup).toHaveTextContent('Nice Work!');
        expect(resultPopup).toHaveTextContent(runCrew.getGuessGator().name);
    });

    test('guess grid should render result row for each failed guess but not the guess bar after final guess is made', () => {
        let guessBar;
        for (let i = 0; i < 6; i++) {
            const guessText = startButton = screen.getByText(`${i + 1}/6`);
            expect(guessText).toBeInTheDocument();
            guessBar = document.getElementById('guessBar');
            fireEvent.change(guessBar, {target: {value: 'Amber Chan'}});
            fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
            const resultRow = document.getElementById('row-' + (i + 1).toString());
            expect(resultRow).toBeInTheDocument();
        }
        guessBar = document.getElementById('guessBar');
        expect(guessBar).not.toBeInTheDocument();
        const resultPopup = document.getElementById('result-popup');
        expect(resultPopup).toHaveTextContent('Better luck next time!');
        expect(resultPopup).toHaveTextContent(runCrew.getGuessGator().name);
    });

    test('guess grid result row contents should be accurate if a guess is made', () => {
        let guessBar = document.getElementById('guessBar');
        fireEvent.change(guessBar, {target: {value: 'Amber Chan'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        const resultName = document.getElementById('row-1-name');
        expect(resultName).toHaveTextContent('Amber Chan');
        expect(resultName.classList.contains('incorrect')).toBe(true);
        const resultDegree = document.getElementById('row-1-degree');
        expect(resultDegree).toHaveTextContent('Communications / Journalism');
        expect(resultDegree.classList.contains('incorrect')).toBe(true);
        const resultCountry = document.getElementById('row-1-country');
        expect(resultCountry).toHaveTextContent('🇸🇬');
        expect(resultCountry.classList.contains('same-continent')).toBe(true);
        const resultFloor = document.getElementById('row-1-floor');
        expect(resultFloor).toHaveTextContent('3');
        expect(resultFloor.classList.contains('correct')).toBe(true);
    });
});

describe('testing guess-grid error cases in Home', () => {
    let startButton;
    let goldle;

    beforeEach(() => {
        render(<Home />);
        startButton = screen.getByText('START');
        fireEvent.click(startButton);
        goldle = getGoldle();
        goldle.rigGame("Joel Jose");
    });

    test('guess grid does not render result row or next guess bar and shows recommendations (if available) if invalid input', () => {
        let guessBar = document.getElementById('guessBar');
        fireEvent.change(guessBar, {target: {value: 'ambe'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        guessBar = document.getElementById('bar-1');
        expect(guessBar).toBeInTheDocument();
        const resultRow = document.getElementById('row-1');
        expect(resultRow).not.toBeInTheDocument();
        guessBar = document.getElementById('bar-2');
        expect(guessBar).not.toBeInTheDocument();
        const recommendationText = document.getElementById('recommendation');
        expect(recommendationText).toBeInTheDocument();
    });
});