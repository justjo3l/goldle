import {getCountryCode, getCountryData, continents} from 'countries-list';

import {goldleGators, goldleFacultyMap} from 'assets/assets.js';

import same, {getFaculty} from 'utils/helper.js';

/**
 * @description The GoldleRunCrew class.
 * @class
 */
class GoldleRunCrew {
  /**
   * @description Creates a GoldleRunCrew object.
   * @constructor
   */
  constructor() {
    this.gators = [];
    this.gatorNames = [];
    this.facultyMap = new Map();
    this.guessGator = null;
  }

  // Setup functions

  /**
   * @return {object} Empty object.
   * @description Sets up the gators.
  */
  setupGators = function() {
    this.gators = goldleGators;
    this.setupGatorNames(goldleGators);
    this.setupFacultyMap(goldleFacultyMap);
    return {};
  };

  /**
   * @param {Array} gators
   * @return {Array} The gator names.
   * @description Sets up the gator names.
   */
  setupGatorNames = function(gators) {
    this.gatorNames = [];
    this.gators = gators;
    for (let i = 0; i < gators.length; i++) {
      this.gatorNames.push(gators[i].name);
    }

    return this.gatorNames;
  };

  /**
   * @param {object} facultyMap
   * @return {object} Empty object.
   * @description Sets up the faculty map.
   */
  setupFacultyMap = function(facultyMap) {
    this.facultyMap = new Map();
    for (let i = 0; i < facultyMap['value'].length; i++) {
      this.facultyMap.set(facultyMap['value'][i][0], facultyMap['value'][i][1]);
    }
    return {};
  };

  /**
   * @param {string} name
   * @return {object} The guess gator or null.
   * @description Sets up the guess gator.
   */
  setupGuessGator = function(name) {
    if (name) {
      const gator = this.getGatorByName(name);
      if (gator) {
        this.guessGator = gator;
        return gator;
      }
      return null;
    }
    const randomGator = this.gators[Math.floor(Math.random() * this.gators.length)];
    this.guessGator = randomGator;
    return randomGator;
  };

  // Get functions

  /**
   * @param {string} name
   * @param {boolean} exact
   * @return {object} The gator or null.
   * @description Gets a gator by name.
  */
  getGatorByName = function(name, exact=true) {
    const options = [];
    for (let i = 0; i < this.gators.length; i++) {
      if (same(this.gators[i].name, name)) {
        return this.gators[i];
      } else if (!exact) {
        const gatorNameSplit = this.gators[i].name.toLowerCase().split(' ');
        const guessNameSplit = name.toLowerCase().split(' ');
        if (guessNameSplit.some((name) => gatorNameSplit.includes(name))) {
          options.push(this.gators[i]);
        }
      }
    }

    if (options.length === 1) {
      return options[0];
    }

    return null;
  };

  /**
   * @param {string} degree
   * @return {Array} The faculties.
   * @description Gets the faculties of a degree.
   */
  getFaculties = function(degree) {
    const faculties = [];

    for (let i = 0; i < degree.split('/').length; i++) {
      const faculty = getFaculty(degree.split('/')[i].trim(), this.facultyMap);
      if (faculty !== null) {
        faculties.push(faculty);
      }
    }

    return faculties;
  };

  /**
   * @param {string} name
   * @return {Array} The recommendations.
   * @description Gets the recommendations for a name.
   */
  getRecommendations = function(name) {
    let foundNames = [...this.gatorNames];
    foundNames = foundNames.filter((val) => val.toLowerCase().includes(name.toLowerCase()));
    return foundNames;
  };

  /**
   * @return {object} The guess gator.
   * @description Gets the guess gator.
   */
  getGuessGator = function() {
    return this.guessGator;
  };

  // Check functions

  /**
   * @param {string} name
   * @return {boolean} Whether the name exists.
   * @description Checks if a name exists.
   */
  nameExists = function(name) {
    for (let i = 0; i < this.gatorNames.length; i++) {
      if (same(this.gatorNames[i], name)) {
        return true;
      }
    }

    return false;
  };

  // Guess Check functions

  /**
   * @param {string} guessedName
   * @return {object} The guess state.
   * @description Checks the name guess.
   */
  checkName = function(guessedName) {
    const guessName = this.guessGator.name;

    let state = 'incorrect';
    let hint = '';

    if (same(guessedName, guessName)) {
      state = 'correct';
      hint = '👍';
    } else {
      hint = 'The gator is not ' + guessedName;
    }

    return {
      state: state,
      value: guessedName,
      hint: hint,
    };
  };

  /**
   * @param {string} guessedDegree
   * @return {object} The guess state.
   * @description Checks the degree guess.
   */
  checkDegree = function(guessedDegree) {
    const guessDegree = this.guessGator.degree;

    let state = 'incorrect';
    let hint = '';

    let guessedFaculties = [];

    if (same(guessedDegree, guessDegree)) {
      state = 'correct';
      hint = '👍';
    } else if (same(guessedDegree, 'N/A')) {
      state = 'none';
    } else {
      guessedFaculties = this.getFaculties(guessedDegree);

      const guessFaculties = this.getFaculties(guessDegree);

      for (let i = 0; i < guessedFaculties.length; i++) {
        if (guessFaculties.includes(guessedFaculties[i])) {
          state = 'same-faculty';
          hint = 'The gator is from the ' + guessedFaculties[i];
        }
      }
    }

    if (state === 'incorrect') {
      hint = 'The gator is not from the ';
      for (let i = 0; i < guessedFaculties.length; i++) {
        hint += guessedFaculties[i];
        if (i !== guessedFaculties.length - 1) {
          hint += ' or the ';
        }
      }
    }

    return {
      state: state,
      value: guessedDegree,
      hint: hint,
    };
  };

  /**
   * @param {string} guessedFloor
   * @return {object} The guess state.
   * @description Checks the floor guess.
   */
  checkFloor = function(guessedFloor) {
    const guessFloor = this.guessGator.room[0];

    let state = 'incorrect';
    let hint = '';

    if (parseInt(guessedFloor) === parseInt(guessFloor)) {
      state = 'correct';
      hint = '👍';
    } else if (same(guessedFloor.toString(), 'N/A')) {
      state = 'none';
    } else if (Math.abs(parseInt(guessedFloor) - parseInt(guessFloor)) === 1) {
      state = 'neighbour';
      hint = 'The gator is on a neighbouring floor';
    } else {
      hint = 'The gator is not on a neighbouring floor';
    }

    return {
      state: state,
      value: guessedFloor,
      hint: hint,
    };
  };

  /**
   * @param {string} guessedCountry
   * @return {object} The guess state.
   * @description Checks the country guess.
   */
  checkCountry = function(guessedCountry) {
    const guessCountry = this.guessGator.country;

    const guessedContinent = getCountryData(getCountryCode(guessedCountry)).continent;
    const guessContinent = getCountryData(getCountryCode(guessCountry)).continent;

    let state = 'incorrect';
    let hint = '';

    if (same(guessedCountry, guessCountry)) {
      state = 'correct';
      hint = '👍';
    } else if (same(guessedCountry, 'N/A')) {
      state = 'none';
    } else if (guessedContinent && guessContinent && same(guessedContinent, guessContinent)) {
      state = 'same-continent';
      const guessContinentFullName = continents[guessContinent];
      hint = 'The gator is from ' + guessContinentFullName;
    } else {
      hint = 'The gator is from a different continent';
    }

    return {
      state: state,
      value: guessedCountry,
      hint: hint,
    };
  };
}

export default GoldleRunCrew;