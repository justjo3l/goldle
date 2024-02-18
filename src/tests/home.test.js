import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import Home, { getGoldle } from 'pages/Home.js';

import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { act } from 'react-dom/test-utils';

describe('testing start stage in Home', () => {

    let startButton;
    let helpButton;

    beforeEach(() => {
        render(<Home />);
        startButton = screen.getByText(/start/i);
        helpButton = screen.getByAltText(/help/i);
    });

    describe('testing pre-game start screen', () => {
        test('start stage should render start button', () => {
            expect(startButton).toBeInTheDocument();
        });

        test('start stage should render help button', () => {
            expect(helpButton).toBeInTheDocument();
        });

        test('clicking help button should render help popup', () => {
            fireEvent.click(helpButton);
            const helpPopup = document.getElementById('help-modal');
            expect(helpPopup).toBeInTheDocument();
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
        startButton = screen.getByText(/start/i);
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
        const guessBar = document.getElementById('guess-bar');
        fireEvent.change(guessBar, {target: {value: 'Amber Chan'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        const recommendationText = document.getElementById('recommendation');
        expect(recommendationText).not.toBeInTheDocument();
    });

    test('guess grid renders result row and next guess bar on incorrect guess', () => {
        let guessBar = document.getElementById('guess-bar');
        fireEvent.change(guessBar, {target: {value: 'Amber Chan'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        const resultRow = document.getElementById('row-1');
        expect(resultRow).toBeInTheDocument();
        guessBar = document.getElementById('bar-2');
        expect(guessBar).toBeInTheDocument();
    });

    test('guess grid should render result row but not the next guess bar on correct guess', () => {
        let guessBar = document.getElementById('guess-bar');
        jest.useFakeTimers();
        fireEvent.change(guessBar, {target: {value: 'Joel Jose'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        const resultRow = document.getElementById('row-1');
        expect(resultRow).toBeInTheDocument();
        guessBar = document.getElementById('bar-2');
        expect(guessBar).not.toBeInTheDocument();
        act(() => {
            jest.runAllTimers();
        
        })
        const resultPopup = document.getElementById('win-modal');
        expect(resultPopup).toHaveTextContent('Nice Work!');
        expect(resultPopup).toHaveTextContent(runCrew.getGuessGator().name);
        const playAgainButton = screen.getByText(/play again/i);
        expect(playAgainButton).toBeInTheDocument();
        jest.useRealTimers();
    });

    test('guess grid should render result row for each failed guess but not the guess bar after final guess is made', () => {
        let guessBar;
        jest.useFakeTimers();
        for (let i = 0; i < 6; i++) {
            const guessText = startButton = screen.getByText(`${i + 1}/6`);
            expect(guessText).toBeInTheDocument();
            guessBar = document.getElementById('guess-bar');
            fireEvent.change(guessBar, {target: {value: 'Amber Chan'}});
            fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
            const resultRow = document.getElementById('row-' + (i + 1).toString());
            expect(resultRow).toBeInTheDocument();
        }
        guessBar = document.getElementById('guess-bar');
        expect(guessBar).not.toBeInTheDocument();
        act(() => {
            jest.runAllTimers();
        });
        const resultPopup = document.getElementById('lose-modal');
        expect(resultPopup).toHaveTextContent('Better luck next time!');
        expect(resultPopup).toHaveTextContent(runCrew.getGuessGator().name);
        const playAgainButton = screen.getByText(/play again/i);
        expect(playAgainButton).toBeInTheDocument();
        jest.useRealTimers();
    });

    test('guess grid result row contents should be accurate if a guess is made', () => {
        let guessBar = document.getElementById('guess-bar');
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
        expect(resultCountry.classList.contains('near')).toBe(true);
        const resultFloor = document.getElementById('row-1-floor');
        expect(resultFloor).toHaveTextContent('3');
        expect(resultFloor.classList.contains('correct')).toBe(true);
    });

    test('guess grid should start game again if won and play again button is clicked', () => {
        let guessBar = document.getElementById('guess-bar');
        jest.useFakeTimers();
        fireEvent.change(guessBar, {target: {value: 'Joel Jose'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        act(() => {
            jest.runAllTimers();
        });
        const playAgainButton = screen.getByText(/play again/i);
        fireEvent.click(playAgainButton);
        guessBar = document.getElementById('guess-bar');
        expect(guessBar).toBeInTheDocument();
        jest.useRealTimers();
    });

    test('guess grid should start game again if lost and play again button is clicked', () => {
        let guessBar;
        jest.useFakeTimers();
        for (let i = 0; i < 6; i++) {
            guessBar = document.getElementById('guess-bar');
            fireEvent.change(guessBar, {target: {value: 'Amber Chan'}});
            fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        }
        act(() => {
            jest.runAllTimers();
        });
        const playAgainButton = screen.getByText(/play again/i);
        fireEvent.click(playAgainButton);
        guessBar = document.getElementById('guess-bar');
        expect(guessBar).toBeInTheDocument();
        for (let i = 2; i <= 6; i++) {
            let row = document.getElementById('r-' + i.toString());
            expect(row).toHaveTextContent('');
        }
        jest.useRealTimers();
    });
});

describe('testing guess-grid error cases in Home', () => {
    let startButton;
    let goldle;

    beforeEach(() => {
        render(<Home />);
        startButton = screen.getByText(/start/i);
        fireEvent.click(startButton);
        goldle = getGoldle();
        goldle.rigGame("Joel Jose");
    });

    test('guess grid does not change if another key is down instead of enter on guess bar', () => {
        let guessBar = document.getElementById('guess-bar');
        fireEvent.change(guessBar, {target: {value: 'ambe'}});
        fireEvent.keyDown(guessBar, {key: 'a', code: 'a'});
        guessBar = document.getElementById('bar-1');
        expect(guessBar).toBeInTheDocument();
        const resultRow = document.getElementById('row-1');
        expect(resultRow).not.toBeInTheDocument();
        guessBar = document.getElementById('bar-2');
        expect(guessBar).not.toBeInTheDocument();
    });

    test('guess grid does not render result row or next guess bar and shows recommendations (if available) if invalid input', () => {
        let guessBar = document.getElementById('guess-bar');
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

    test('guess grid click recommendation inserts it into guessBar', () => {
        let guessBar = document.getElementById('guess-bar');
        fireEvent.change(guessBar, {target: {value: 'ambe'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        guessBar = document.getElementById('bar-1');
        const recommendationName = document.getElementById('recommendation-name');
        fireEvent.click(recommendationName);
        guessBar = document.getElementById('guess-bar');
        expect(guessBar).toHaveValue(recommendationName.textContent);
    });
});