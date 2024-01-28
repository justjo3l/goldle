import same from '../utils/helper.js';

describe('testing same() in helper.js', () => {
    test('same() should return true if strings are same regardless of case', () => {
        expect(same('hello', 'hello')).toBe(true);
        expect(same('hello', 'HelLo')).toBe(true);
    });

    test('same() should return false if strings are not same', () => {
        expect(same('hello', 'olleh')).toBe(false);
    });
});