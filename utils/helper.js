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

export const getCountryEmoji = (country) => {
  const countryName = country.toLowerCase();
  for (let i = 0; i < countryFlagEmoji.list.length; i++) {
    if (countryFlagEmoji.list[i].name.toLowerCase().includes(countryName)) {
      return countryFlagEmoji.list[i].emoji;
    }
  }
};

export default same;
