import countryFlagEmoji from 'country-flag-emoji';

function same(val1, val2) {
    return val1.toLowerCase() === val2.toLowerCase();
}

export const getCountryEmoji = (country) => {
    for (let i = 0; i < countryFlagEmoji.list.length; i++) {
      if (countryFlagEmoji.list[i].name.toLowerCase().includes(country.toLowerCase())) {
        return countryFlagEmoji.list[i].emoji;
      }
    }
}

export default same;