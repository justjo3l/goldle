import same from 'utils/helper.js';

import GoldleRunCrew from 'backend/goldleRunCrew.js';

import goldleConfig from 'assets/goldle-config.json';

const GUESSES = goldleConfig.numGuesses;

/**
 * @description The Goldle class.
 * @class
 */
class Goldle {
  /**
   * @description Creates a Goldle object.
   * @constructor
   */
  constructor() {
    this.runCrew = new GoldleRunCrew();
    this.guessStates = [];
    this.numGuesses = 0;
    this.status = 'inactive';
  }

  /**
   * @param {number} numGuesses
   * @return {string} The status of the game.
   * @description Starts the game.
   */
  startGame = function(numGuesses) {
    if (same(this.status, 'started')) {
      return this.status;
    }

    this.runCrew.setupGators('gator-data.csv', 'faculty-data.csv');
    this.runCrew.setupGuessGator();
    this.numGuesses = numGuesses || GUESSES;
    this.status = 'started';
    return this.status;
  };

  /**
   * @param {string} name
   * @return {object} The guess state.
   * @description Guesses a gator's name.
   */
  guessName = function(name) {
    const goldle = this;
    if (!same(goldle.status, 'started')) {
      return {
        'error': 'Game not started',
      };
    }
    const guessedGator = goldle.runCrew.getGatorByName(name, false);
    if (!guessedGator) {
      const recommendations = goldle.runCrew.getRecommendations(name);
      return {
        'error': 'Gator not found',
        'recommendation': recommendations[0],
      };
    }
    goldle.numGuesses -= 1;
    const newGuessState = {};
    newGuessState.name = goldle.runCrew.checkName(guessedGator.name);
    newGuessState.degree = goldle.runCrew.checkDegree(guessedGator.degree);
    newGuessState.floor = goldle.runCrew.checkFloor(guessedGator.room[0]);
    newGuessState.country = goldle.runCrew.checkCountry(guessedGator.country);
    goldle.guessStates.push(newGuessState);
    if (newGuessState.name.state === 'correct') {
      goldle.status = 'won';
      return {
        'guessState': newGuessState,
        'gameState': 'won',
      };
    } else if (goldle.numGuesses === 0) {
      goldle.status = 'lost';
      return {
        'guessState': newGuessState,
        'gameState': 'lost',
      };
    } else {
      return {'guessState': newGuessState};
    }
  };

  /**
   * @param {string} name
   * @return {object} The guess gator if set.
   * @description Sets the guess gator.
   */
  rigGame = function(name) {
    if (this.runCrew.nameExists(name)) {
      this.guessGator = this.runCrew.setupGuessGator(name);
      return this.guessGator;
    }
    return null;
  };

  /**
   * @return {string} The status of the game.
   * @description Gets the status of the game.
   */
  getState = function() {
    return this.status;
  };
}

export default Goldle;