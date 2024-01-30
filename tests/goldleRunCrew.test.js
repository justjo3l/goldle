import GoldleRunCrew from '../backend/goldleRunCrew.js';

import { goldleFacultyMap } from '../assets.js';

describe('testing setupGuessGator() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        runCrew = new GoldleRunCrew();
        runCrew.setupGators();
    });

    test('setupGuessGator() should be successful if name is valid', () => {
        expect(runCrew.setupGuessGator('Joel Jose')).not.toStrictEqual(null);
    });

    test('setupGuessGator() should return null if name does not exist', () => {
        expect(runCrew.setupGuessGator('John Doe')).toStrictEqual(null);
    });

    test('setupGuessGator() should be random if name is not provided', () => {
        expect(runCrew.setupGuessGator()).not.toStrictEqual(null);
    });
});

describe('testing getGatorByName() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        runCrew = new GoldleRunCrew();
        runCrew.setupGators();
    });

    test('getGatorByName() should return gator if name exists', () => {
        expect(runCrew.getGatorByName('Joel Jose')).not.toStrictEqual(null);
    });

    test('getGatorByName() should return gator if first name exists in different case', () => {
        expect(runCrew.getGatorByName('joEl jOse', false)).not.toStrictEqual(null);
    });

    test('getGatorByName() [NOT EXACT] should return gator if first name exists and only one option exists', () => {
        expect(runCrew.getGatorByName('Joel', false)).not.toStrictEqual(null);
    });

    test('getGatorByName() [NOT EXACT] should return gator if multiple parts of name exists and only one option exists', () => {
        expect(runCrew.getGatorByName('Grace Gath', false)).not.toStrictEqual(null);
    });

    test('getGatorByName() [NOT EXACT] should return null if first name exists and more than one option exists', () => {
        expect(runCrew.getGatorByName('James', false)).toStrictEqual(null);
    });

    test('getGatorByName() should return null if name does not exist', () => {
        expect(runCrew.getGatorByName('John Doe')).toStrictEqual(null);
    });
});

describe('testing getFaculty() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        runCrew = new GoldleRunCrew();
        runCrew.setupGators();
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
        runCrew = new GoldleRunCrew();
        runCrew.setupGators();
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
        runCrew = new GoldleRunCrew();
        runCrew.setupGators();
    });

    test('getRecommendations() should return list of options if name could potentially exist', () => {
        expect(runCrew.getRecommendations('joe').length).not.toStrictEqual(0);
    });

    test('getRecommendations() should return an empty array if no name options exist', () => {
        expect(runCrew.getRecommendations('John Doe').length).toStrictEqual(0);
    });
});

describe('testing getGuessGator() in Goldle', () => {
    let runCrew;

    beforeEach(() => {
        runCrew = new GoldleRunCrew();
    });

    test('getGuessGator() should return gator details if gator has been set', () => {
        runCrew.setupGators();
        runCrew.setupGuessGator("Joel Jose")
        expect(runCrew.getGuessGator()).not.toStrictEqual(null);
    });

    test('getGuessGator() should return null if gator has not been set', () => {
        expect(runCrew.getGuessGator()).toStrictEqual(null);
    });
})

describe('testing nameExists() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        runCrew = new GoldleRunCrew();
        runCrew.setupGators();
    });

    test('nameExists() should return true if name exists', () => {
        expect(runCrew.nameExists('Joel Jose')).toStrictEqual(true);
    });

    test('nameExists() should return false if name does not exist', () => {
        expect(runCrew.nameExists('John Doe')).toStrictEqual(false);
    });
});

describe('testing checkName() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        runCrew = new GoldleRunCrew();
        runCrew.setupGators();
        runCrew.setupGuessGator("Joel Jose");
    });

    test('checkName() should return correct if name is correct', () => {
        expect(runCrew.checkName("Joel Jose")).toStrictEqual({
            state: 'correct',
            value: 'Joel Jose',
            hint: '👍'
        });
    });

    test('checkName() should return incorrect if name is incorrect', () => {
        expect(runCrew.checkName("Amber Chan")).toStrictEqual({
            state: 'incorrect',
            value: 'Amber Chan',
            hint: 'The gator is not Amber Chan'
        });
    });
});

describe('testing checkDegree() in GoldleRunCrew', () => {
    let runCrew;

    beforeEach(() => {
        runCrew = new GoldleRunCrew();
        runCrew.setupGators();
        runCrew.setupGuessGator("Joel Jose");
    });

    test('checkDegree() should return correct if degree is correct', () => {
        expect(runCrew.checkDegree("Computer Engineering")).toStrictEqual({
            state: 'correct',
            value: 'Computer Engineering',
            hint: '👍'
        });
    });

    test('checkDegree() should return same faculty if degree is from the same faculty', () => {
        expect(runCrew.checkDegree("Quantum Engineering")).toStrictEqual({
            state: 'same-faculty',
            value: 'Quantum Engineering',
            hint: 'The gator is from the Faculty of Engineering'
        });
    });

    test('checkDegree() should return none if degree is incorrect and N/A', () => {
        expect(runCrew.checkDegree("N/A")).toStrictEqual({
            state: 'none',
            value: 'N/A',
            hint: ''
        });
    });

    test('checkDegree() should return incorrect if degree is incorrect and not N/A', () => {
        expect(runCrew.checkDegree("Media")).toStrictEqual({
            state: 'incorrect',
            value: 'Media',
            hint: 'The gator is not from the Faculty of Arts, Design and Architecture'
        });
    });
});

describe('testing checkFloor() in Goldle', () => {
    let runCrew;

    beforeEach(() => {
        runCrew = new GoldleRunCrew();
        runCrew.setupGators();
        runCrew.setupGuessGator("Joel Jose");
    });

    test('checkFloor() should return correct if floor is correct', () => {
        expect(runCrew.checkFloor(3)).toStrictEqual({
            state: 'correct',
            value: 3,
            hint: '👍'
        });
    });

    test('checkFloor() should return neighbour if floor is 1 away', () => {
        expect(runCrew.checkFloor(2)).toStrictEqual({
            state: 'neighbour',
            value: 2,
            hint: 'The gator is on a neighbouring floor'
        });
        expect(runCrew.checkFloor(4)).toStrictEqual({
            state: 'neighbour',
            value: 4,
            hint: 'The gator is on a neighbouring floor'
        });
    });

    test('checkFloor() should return none if floor is incorrect and N/A', () => {
        expect(runCrew.checkFloor("N/A")).toStrictEqual({
            state: 'none',
            value: 'N/A',
            hint: ''
        });
    });

    test('checkFloor() should return incorrect if floor is incorrect and not N/A', () => {
        expect(runCrew.checkFloor(1)).toStrictEqual({
            state: 'incorrect',
            value: 1,
            hint: 'The gator is not on a neighbouring floor'
        });
        expect(runCrew.checkFloor(5)).toStrictEqual({
            state: 'incorrect',
            value: 5,
            hint: 'The gator is not on a neighbouring floor'
        });
    });
});

describe('testing checkCountry() in Goldle', () => {
    let runCrew;

    beforeEach(() => {
        runCrew = new GoldleRunCrew();
        runCrew.setupGators();
        runCrew.setupGuessGator("Joel Jose");
    });

    test('checkCountry() should return correct if country is correct', () => {
        expect(runCrew.checkCountry("United Arab Emirates")).toStrictEqual({
            state: 'correct',
            value: 'United Arab Emirates',
            hint: '👍'
        });
    });

    test('checkCountry() should return same continent if country is from the same continent', () => {
        expect(runCrew.checkCountry("China")).toStrictEqual({
            state: 'same-continent',
            value: 'China',
            hint: 'The gator is from Asia'
        });
    });

    test('checkCountry() should return none if country is incorrect and N/A', () => {
        expect(runCrew.checkCountry("N/A")).toStrictEqual({
            state: 'none',
            value: 'N/A',
            hint: ''
        });
    });

    test('checkCountry() should return different continent if country is incorrect and not N/A', () => {
        expect(runCrew.checkCountry("United Kingdom")).toStrictEqual({
            state: 'incorrect',
            value: 'United Kingdom',
            hint: 'The gator is from a different continent'
        });
    });
});