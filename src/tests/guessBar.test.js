import React from 'react';

import GuessBar from 'components/GuessBar/GuessBar.js';

import '@testing-library/jest-dom';
import { describe, test, expect } from '@jest/globals';

import { render, fireEvent } from '@testing-library/react';

import Goldle from "backend/goldle.js";

describe('testing GuessBar', () => {

    test('GuessBar should exist without id', () => {
        const goldle = new Goldle();
        goldle.startGame();
        goldle.rigGame('Joel Jose');
        render(<GuessBar goldle={goldle} onGuess={() => {}} onError={() => {}} />);
        const guessBar = document.getElementById('guess-bar');
        expect(guessBar).toBeInTheDocument();
    });

    test('GuessBar should not do anything if error encountered', () => {
        const goldle = new Goldle();
        goldle.startGame();
        goldle.rigGame('Joel Jose');
        render(<GuessBar goldle={goldle} onGuess={() => {}} onError={() => {}} />);
        const guessBar = document.getElementById('guess-bar');
        fireEvent.change(guessBar, {target: {value: 'Jo'}});
        fireEvent.keyDown(guessBar, {key: 'Enter', code: 'Enter'});
        expect(guessBar).toBeInTheDocument();
    });
});