import Goldle from '../backend.js';

import { goldleFacultyMap } from '../assets.js';

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
});

describe('testing getFaculty() in Goldle', () => {
    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
    });

    test('getFaculty() should return correct faculty if degree exists', () => {
        const randomFacultyInfo = goldleFacultyMap.value[Math.floor(Math.random() * goldleFacultyMap.value.length)];
        const randomFaculty = randomFacultyInfo[0];
        const randomDegree = randomFacultyInfo[1][Math.floor(Math.random() * randomFacultyInfo[1].length)];
        expect(goldle.getFaculty(randomDegree)).toStrictEqual(randomFaculty);
    });

    test('getFaculty() should return null if degree does not exist', () => {
        expect(goldle.getFaculty('John Doe')).toStrictEqual(null);
    });
});

describe('testing getFaculties() in Goldle', () => {
    let goldle;

    beforeEach(() => {
        goldle = new Goldle();
        goldle.setupGators();
    });

    test('getFaculties() should return correct faculties if degree/degrees exist', () => {
        expect(goldle.getFaculties("Media / Computer Engineering")).toStrictEqual(["Faculty of Arts, Design and Architecture", "Faculty of Engineering"]);
        expect(goldle.getFaculties("FakeMedia / Computer Engineering")).toStrictEqual(["Faculty of Engineering"]);
        expect(goldle.getFaculties("Media / FakeComputer Engineering")).toStrictEqual(["Faculty of Arts, Design and Architecture"]);
    });

    test('getFaculties() should return empty list if degree/degrees are invalid', () => {
        expect(goldle.getFaculties('John Doe').length).toStrictEqual(0);
        expect(goldle.getFaculties('FakeMedia / FakeComputer Engineering').length).toStrictEqual(0);
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
        expect(goldle.checkDegree("Quantum Engineering")).toStrictEqual('same faculty');
    });

    test('checkDegree() should return none if degree is incorrect and N/A', () => {
        expect(goldle.checkDegree("N/A")).toStrictEqual('none');
    });

    test('checkDegree() should return different faculty if degree is incorrect and not N/A', () => {
        expect(goldle.checkDegree("Media")).toStrictEqual('different faculty');
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
        expect(goldle.checkCountry("China")).toStrictEqual('same continent');
    });

    test('checkCountry() should return different continent if country is incorrect and not N/A', () => {
        expect(goldle.checkCountry("United Kingdom")).toStrictEqual('different continent');
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