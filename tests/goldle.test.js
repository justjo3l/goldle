import Goldle from '../backend/goldle.js';

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
});

describe('testing checkDegree() in Goldle', () => {
    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
        goldle.rigGame("Joel Jose");
    });

    test('checkDegree() should return correct if degree is correct', () => {
        expect(goldle.checkDegree("Computer Engineering")).toStrictEqual('correct');
    });

    test('checkDegree() should return same faculty if degree is from the same faculty', () => {
        expect(goldle.checkDegree("Quantum Engineering")).toStrictEqual('same-faculty');
    });

    test('checkDegree() should return none if degree is incorrect and N/A', () => {
        expect(goldle.checkDegree("N/A")).toStrictEqual('none');
    });

    test('checkDegree() should return different faculty if degree is incorrect and not N/A', () => {
        expect(goldle.checkDegree("Media")).toStrictEqual('incorrect');
    });
});

describe('testing checkFloor() in Goldle', () => {
    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
        goldle.rigGame("Joel Jose");
    });

    test('checkFloor() should return correct if floor is correct', () => {
        expect(goldle.checkFloor(3)).toStrictEqual('correct');
    });

    test('checkFloor() should return neighbour if floor is 1 away', () => {
        expect(goldle.checkFloor(2)).toStrictEqual('neighbour');
        expect(goldle.checkFloor(4)).toStrictEqual('neighbour');
    });

    test('checkFloor() should return incorrect if floor is incorrect and not N/A', () => {
        expect(goldle.checkFloor(1)).toStrictEqual('incorrect');
        expect(goldle.checkFloor(5)).toStrictEqual('incorrect');
    });
});

describe('testing checkCountry() in Goldle', () => {
    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
        goldle.rigGame("Joel Jose");
    });

    test('checkCountry() should return correct if country is correct', () => {
        expect(goldle.checkCountry("United Arab Emirates")).toStrictEqual('correct');
    });

    test('checkCountry() should return same continent if country is from the same continent', () => {
        expect(goldle.checkCountry("China")).toStrictEqual('same-continent');
    });

    test('checkCountry() should return different continent if country is incorrect and not N/A', () => {
        expect(goldle.checkCountry("United Kingdom")).toStrictEqual('incorrect');
    });
});

describe('testing showGator() in Goldle', () => {
    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
    });

    test('showGator() should return gator details if gator has been set', () => {
        goldle.startGame();
        expect(goldle.showGator()).not.toStrictEqual(null);
    });

    test('showGator() should return null if gator has not been set', () => {
        expect(goldle.showGator()).toStrictEqual(null);
    });
})

describe('testing rigGame() in Goldle', () => {
    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
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
        goldle = new Goldle();
        goldle.setupGators();
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