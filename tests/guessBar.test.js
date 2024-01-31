import GuessBar from '../components/guessBar.js';

import '@testing-library/jest-dom'

import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Goldle from "../backend/goldle.js";

describe('testing GuessBar', () => {

    test('GuessBar should exist without id', () => {
        const goldle = new Goldle();
        goldle.startGame();
        goldle.rigGame('Joel Jose');
        render(<GuessBar goldle={goldle} onGuess={() => {}} onError={() => {}} />);
        const guessBar = document.getElementById('guessBar');
        expect(guessBar).toBeInTheDocument();
    });

    test('GuessBar should not do anything if error encountered', () => {
        const goldle = new Goldle();
        goldle.startGame();
        goldle.rigGame('Joel Jose');
        render(<GuessBar goldle={goldle} onGuess={() => {}} onError={() => {}} />);
        const guessBar = document.getElementById('guessBar');
        fireEvent.change(guessBar, {target: {value: 'Jo'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        expect(guessBar).toBeInTheDocument();
    });
});