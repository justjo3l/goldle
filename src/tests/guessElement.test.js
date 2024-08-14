import React from 'react';

import GuessElement from 'components/GuessElement/GuessElement.js';

import '@testing-library/jest-dom'
import { describe, test, expect } from '@jest/globals';

import { render, fireEvent } from '@testing-library/react';

import Goldle from "backend/goldle.js";

describe('testing GuessElement', () => {

    test('GuessElement should function without id', () => {
        const goldle = new Goldle(true);
        goldle.startGame();
        goldle.rigGame('Joel Jose');
        const guessState = goldle.guessName('Justin Cheung').guessState.floor;
        render(
            <div id='test-ele'>
                <GuessElement guess={guessState} guessKey='floor'/>
            </div>
        );
        const guessElement = document.getElementById('test-ele').children[0];
        expect(guessElement).toHaveTextContent('3');
        fireEvent.click(guessElement);
        expect(guessElement).toHaveTextContent('The gator is on a neighbouring floor');
    });

    test('GuessElement should show hint when clicked', () => {
        const goldle = new Goldle(true);
        goldle.startGame();
        goldle.rigGame('Joel Jose');
        const guessState = goldle.guessName('Justin Cheung').guessState.floor;
        render(<GuessElement guess={guessState} guessKey='floor' id='test-ele'/>);
        const guessElement = document.getElementById('test-ele');
        expect(guessElement).toHaveTextContent('3');
        fireEvent.click(guessElement);
        expect(guessElement).toHaveTextContent('The gator is on a neighbouring floor');
    });

    test('GuessElement should not show hint when correct guess is clicked', () => {
        const goldle = new Goldle(true);
        goldle.startGame();
        goldle.rigGame('Joel Jose');
        const guessState = goldle.guessName('Holly Smith').guessState.floor;
        render(<GuessElement guess={guessState} guessKey='floor' id='test-ele'/>);
        const guessElement = document.getElementById('test-ele');
        expect(guessElement).toHaveTextContent('4');
        fireEvent.click(guessElement);
        expect(guessElement).toHaveTextContent('4');
    });
});