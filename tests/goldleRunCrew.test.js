import Goldle from '../backend/goldle.js';

import { goldleFacultyMap } from '../assets.js';

describe('testing getGatorByName() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        const goldle = new Goldle();
        goldle.setupGators();
        runCrew = goldle.runCrew;
    });

    test('getGatorByName() should return gator if name exists', () => {
        expect(runCrew.getGatorByName('Joel Jose')).not.toStrictEqual(null);
    });

    test('getGatorByName() should return null if name does not exist', () => {
        expect(runCrew.getGatorByName('John Doe')).toStrictEqual(null);
    });
});

describe('testing getFaculty() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        const goldle = new Goldle();
        goldle.setupGators();
        runCrew = goldle.runCrew;
    });

    test('getFaculty() should return correct faculty if degree exists', () => {
        const randomFacultyInfo = goldleFacultyMap.value[Math.floor(Math.random() * goldleFacultyMap.value.length)];
        const randomFaculty = randomFacultyInfo[0];
        const randomDegree = randomFacultyInfo[1][Math.floor(Math.random() * randomFacultyInfo[1].length)];
        expect(runCrew.getFaculty(randomDegree)).toStrictEqual(randomFaculty);
    });

    test('getFaculty() should return null if degree does not exist', () => {
        expect(runCrew.getFaculty('John Doe')).toStrictEqual(null);
    });
});

describe('testing getFaculties() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        const goldle = new Goldle();
        goldle.setupGators();
        runCrew = goldle.runCrew;
    });

    test('getFaculties() should return correct faculties if degree/degrees exist', () => {
        expect(runCrew.getFaculties("Media / Computer Engineering")).toStrictEqual(["Faculty of Arts, Design and Architecture", "Faculty of Engineering"]);
        expect(runCrew.getFaculties("FakeMedia / Computer Engineering")).toStrictEqual(["Faculty of Engineering"]);
        expect(runCrew.getFaculties("Media / FakeComputer Engineering")).toStrictEqual(["Faculty of Arts, Design and Architecture"]);
    });

    test('getFaculties() should return empty list if degree/degrees are invalid', () => {
        expect(runCrew.getFaculties('John Doe').length).toStrictEqual(0);
        expect(runCrew.getFaculties('FakeMedia / FakeComputer Engineering').length).toStrictEqual(0);
    });
});

describe('testing getRecommendations() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        const goldle = new Goldle();
        goldle.setupGators();
        runCrew = goldle.runCrew;
    });

    test('getRecommendations() should return list of options if name could potentially exist', () => {
        expect(runCrew.getRecommendations('joe').length).not.toStrictEqual(0);
    });

    test('getRecommendations() should return an empty array if no name options exist', () => {
        expect(runCrew.getRecommendations('John Doe').length).toStrictEqual(0);
    });
});

describe('testing nameExists() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        const goldle = new Goldle();
        goldle.setupGators();
        runCrew = goldle.runCrew;
    });

    test('nameExists() should return true if name exists', () => {
        expect(runCrew.nameExists('Joel Jose')).toStrictEqual(true);
    });

    test('nameExists() should return false if name does not exist', () => {
        expect(runCrew.nameExists('John Doe')).toStrictEqual(false);
    });
});

describe('testing checkDegree() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        const goldle = new Goldle();
        goldle.setupGators();
        goldle.rigGame("Joel Jose");
        runCrew = goldle.runCrew;
    });

    test('checkDegree() should return correct if degree is correct', () => {
        expect(runCrew.checkDegree("Computer Engineering")).toStrictEqual('correct');
    });

    test('checkDegree() should return same faculty if degree is from the same faculty', () => {
        expect(runCrew.checkDegree("Quantum Engineering")).toStrictEqual('same-faculty');
    });

    test('checkDegree() should return none if degree is incorrect and N/A', () => {
        expect(runCrew.checkDegree("N/A")).toStrictEqual('none');
    });

    test('checkDegree() should return incorrect if degree is incorrect and not N/A', () => {
        expect(runCrew.checkDegree("Media")).toStrictEqual('incorrect');
    });
});

describe('testing checkFloor() in Goldle', () => {
    let runCrew;

    beforeEach(() => {
        const goldle = new Goldle();
        goldle.setupGators();
        goldle.rigGame("Joel Jose");
        runCrew = goldle.runCrew;
    });

    test('checkFloor() should return correct if floor is correct', () => {
        expect(runCrew.checkFloor(3)).toStrictEqual('correct');
    });

    test('checkFloor() should return neighbour if floor is 1 away', () => {
        expect(runCrew.checkFloor(2)).toStrictEqual('neighbour');
        expect(runCrew.checkFloor(4)).toStrictEqual('neighbour');
    });

    test('checkFloor() should return incorrect if floor is incorrect and not N/A', () => {
        expect(runCrew.checkFloor(1)).toStrictEqual('incorrect');
        expect(runCrew.checkFloor(5)).toStrictEqual('incorrect');
    });
});