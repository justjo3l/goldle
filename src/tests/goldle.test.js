import Goldle from 'backend/goldle.js';

import '@testing-library/jest-dom'
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('testing getState() and startGame() in Goldle', () => {
    let goldle;

    beforeEach(() => {
        goldle = new Goldle(true);
    });

    test('getState() should not return inactive if game has not started', () => {
        expect(goldle.getState()).toStrictEqual('inactive');
    });

    test('getState() should return started if game has started', () => {
        goldle.startGame();
        expect(goldle.getState()).toStrictEqual('started');
    });

    test('getState() should return started if game has started and is attempted to start again', () => {
        goldle.startGame();
        goldle.startGame();
        expect(goldle.getState()).toStrictEqual('started');
    });
});

describe('testing rigGame() in Goldle', () => {
    let goldle;

    beforeEach(() => {
        goldle = new Goldle(true);
        goldle.startGame();
    });

    test('rigGame() should return gator if gator exists and game has been rigged', () => {
        expect(goldle.rigGame("Joel Jose")).not.toStrictEqual(null);
    });

    test('rigGame() should return null if gator does not exist and game has not been rigged', () => {
        expect(goldle.rigGame("John Doe")).toStrictEqual(null);
    });
});

describe('testing guessName() in Goldle', () => {
    let goldle;

    beforeEach(() => {
        goldle = new Goldle(true);
    });

    describe('errors', () => {
        test('guessName() should return an error if game has not started', () => {
            expect(goldle.guessName("Joel Jose").error).toStrictEqual("Game not started");
        });

        test('guessName() should return an error if name does not exist', () => {
            goldle.startGame();
            expect(goldle.guessName("John Doe").error).toStrictEqual("Gator not found");
        });
    });

    describe('valid actions', () => {
        beforeEach(() => {
            goldle.startGame();
            goldle.rigGame("Joel Jose");
        });

        test('guessName() should return a won gamestate if name is correct', () => {
            const result = goldle.guessName("Joel Jose");
            expect(result.guessState).not.toStrictEqual(undefined);
            expect(result.gameState).toStrictEqual("won");
        });

        test('guessName() should return a guessState and lost gameState if name is incorrect and no guesses remain', () => {
            goldle.numGuesses = 1;
            const result = goldle.guessName("Amber Chan");
            expect(result.guessState).not.toStrictEqual(undefined);
            expect(result.gameState).toStrictEqual("lost");
        });

        test('guessName() should return a guessState if guess is made', () => {
            const result = goldle.guessName("Amber Chan");
            expect(result.guessState).not.toStrictEqual(undefined);
            expect(result.gameState).toStrictEqual(undefined);
        });
    });

});