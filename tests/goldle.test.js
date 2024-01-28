import Goldle from '../backend.js';

describe('testing getGatorByName() in Goldle', () => {

    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
    });

    test('getGatorByName() should return gator if name exists', () => {
        expect(goldle.getGatorByName('Joel Jose')).not.toStrictEqual(null);
    });

    test('getGatorByName() should return null if name does not exist', () => {
        expect(goldle.getGatorByName('John Doe')).toStrictEqual(null);
    });
});

describe('testing getRandomGator() in Goldle', () => {

    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
    });

    test('getRandomGator() should return a gator', () => {
        expect(goldle.getRandomGator()).not.toStrictEqual(null);
    });
});

describe('testing getState() and startGame() in Goldle', () => {

    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
    });

    test('getState() should not return inactive if game has not started', () => {
        expect(goldle.getState()).toStrictEqual('inactive');
    });

    test('getState() should return started if game has started', () => {
        goldle.startGame();
        expect(goldle.getState()).toStrictEqual('started');
    });
});

describe('testing searchName() in Goldle', () => {
    
    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
    });

    test('searchName() should return list of options if name could potentially exist', () => {
        expect(goldle.searchName('joe').length).not.toStrictEqual(0);
    });

    test('searchName() should return an empty array if no name options exist', () => {
        expect(goldle.searchName('John Doe').length).toStrictEqual(0);
    });
});

describe('testing nameExists() in Goldle', () => {
    
    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
    });

    test('nameExists() should return true if name exists', () => {
        expect(goldle.nameExists('Joel Jose')).toStrictEqual(true);
    });

    test('nameExists() should return false if name does not exist', () => {
        expect(goldle.nameExists('John Doe')).toStrictEqual(false);
    });
})