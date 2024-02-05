import same, {getFaculty} from '../utils/helper.js';

import { goldleFacultyMap } from '../assets/assets.js';

import GoldleRunCrew from '../backend/goldleRunCrew.js';

describe('testing same() in helper.js', () => {
    test('same() should return true if strings are same regardless of case', () => {
        expect(same('hello', 'hello')).toBe(true);
        expect(same('hello', 'HelLo')).toBe(true);
    });

    test('same() should return false if strings are not same', () => {
        expect(same('hello', 'olleh')).toBe(false);
    });
});

describe('testing getFaculty() in helper.js', () => {
    let runCrew;

    beforeEach(() => {
        runCrew = new GoldleRunCrew();
        runCrew.setupGators();
    })

    test('getFaculty() should return correct faculty if degree exists', () => {
        const randomFacultyInfo = goldleFacultyMap.value[Math.floor(Math.random() * goldleFacultyMap.value.length)];
        const randomFaculty = randomFacultyInfo[0];
        const randomDegree = randomFacultyInfo[1][Math.floor(Math.random() * randomFacultyInfo[1].length)];
        expect(getFaculty(randomDegree, runCrew.facultyMap)).toStrictEqual(randomFaculty);
    });

    test('getFaculty() should return null if degree does not exist', () => {
        expect(getFaculty('John Doe', runCrew.facultyMap)).toStrictEqual(null);
    });
});