import Goldle from '../backend/goldle.js';

import { goldleFacultyMap } from '../assets.js';

describe('testing getGatorByName() in Goldle', () => {
    let goldle;
    let runCrew;

    beforeEach(() => {
        goldle = new Goldle();
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

describe('testing getFaculty() in Goldle', () => {
    let goldle;
    let runCrew;

    beforeEach(() => {
        goldle = new Goldle();
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

describe('testing getFaculties() in Goldle', () => {
    let goldle;
    let runCrew;

    beforeEach(() => {
        goldle = new Goldle();
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