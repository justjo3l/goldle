import countryFlagEmoji from 'country-flag-emoji';

/**
 * @param {string} val1
 * @param {string} val2
 * @return {boolean}
 * @description Compares two strings and returns true if they are the same, ignoring case.
 */
function same(val1, val2) {
  return val1.toLowerCase() === val2.toLowerCase();
}

/**
 * @param {string} country
 * @return {string} The country emoji.
 * @description Gets the emoji of a country.
 */
export const getCountryEmoji = (country) => {
  const countryName = country.toLowerCase();
  for (let i = 0; i < countryFlagEmoji.list.length; i++) {
    if (countryFlagEmoji.list[i].name.toLowerCase().includes(countryName)) {
      return countryFlagEmoji.list[i].emoji;
    }
  }
};

/**
 * @param {string} degree
 * @param {object} facultyMap
 * @return {string} The faculty or null.
 * @description Gets the faculty of a degree.
 */
export const getFaculty = function(degree, facultyMap) {
  degree = degree.toLowerCase();
  for (const [key, value] of facultyMap.entries()) {
    if (value.includes(degree)) {
      return key;
    }
  }
  return null;
};

export default same;