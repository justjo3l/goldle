import GuessElement from '../components/guessElement.js';

import '@testing-library/jest-dom'

import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Goldle from "../backend/goldle.js";

describe('testing GuessElement', () => {

    test('GuessElement should show hint when clicked', () => {
        const goldle = new Goldle();
        goldle.startGame();
        goldle.rigGame('Joel Jose');
        const guessState = goldle.guessName('Rosanne Lee').guessState.floor;
        render(<GuessElement guess={guessState} guessKey='floor' id='test-ele'/>);
        const guessElement = document.getElementById('test-ele');
        expect(guessElement).toHaveTextContent('2');
        fireEvent.click(guessElement);
        expect(guessElement).toHaveTextContent('The gator is on a neighbouring floor');
    });

    test('GuessElement should not show hint when correct guess is clicked', () => {
        const goldle = new Goldle();
        goldle.startGame();
        goldle.rigGame('Joel Jose');
        const guessState = goldle.guessName('Amber Chan').guessState.floor;
        render(<GuessElement guess={guessState} guessKey='floor' id='test-ele'/>);
        const guessElement = document.getElementById('test-ele');
        expect(guessElement).toHaveTextContent('3');
        fireEvent.click(guessElement);
        expect(guessElement).toHaveTextContent('3');
    });
});