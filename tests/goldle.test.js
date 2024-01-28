import Goldle from '../backend.js';

describe('testing getGatorByName() in Goldle', () => {

    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
    });

    test('getGatorByName() should return gator if name exists', () => {
        expect(goldle.getGatorByName('Joel Jose')).not.toEqual(null);
    });

    test('getGatorByName() should return null if name does not exist', () => {
        expect(goldle.getGatorByName('John Doe')).toEqual(null);
    });
});

describe('testing getRandomGator() in Goldle', () => {

    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
    });

    test('getRandomGator() should return a gator', () => {
        expect(goldle.getRandomGator()).not.toEqual(null);
    });
});

describe('testing getState() and startGame() in Goldle', () => {

    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
    });

    test('getState() should not return inactive if game has not started', () => {
        expect(goldle.getState()).toEqual('inactive');
    });

    test('getState() should return started if game has started', () => {
        goldle.startGame();
        expect(goldle.getState()).toEqual('started');
    });
});