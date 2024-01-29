import same from '../utils/helper.js';

import GoldleRunCrew from './goldleRunCrew.js';

const gameStates = ['inactive', 'started', 'won', 'lost'];
const degreeStates = ['incorrect', 'same-faculty', 'correct', 'none'];
const floorStates = ['incorrect', 'neighbour', 'correct', 'none'];
const countryStates = ['incorrect', 'same-continent', 'correct', 'none'];

const GUESSES = 6;

class Goldle {

    constructor() {
        this.runCrew = new GoldleRunCrew();
        this.guessStates = [];
        this.numGuesses = 0;
        this.status = 'inactive';
    }

    startGame = function(numGuesses) {
        if (same(this.status, 'started')) {
            return this.status;
        }

        this.runCrew.setupGators('gator-data.csv', 'faculty-data.csv');
        this.runCrew.setupGator();
        this.numGuesses = numGuesses || GUESSES;
        this.status = 'started';
        return this.status;
    }

    guessName = function(name) {
        const goldle = this;
        if (same(goldle.status, 'started')) {
            if (goldle.runCrew.nameExists(name)) {
                let guessedGator = goldle.runCrew.getGatorByName(name);
                goldle.numGuesses--;
                let newGuessState = {}
                    newGuessState.name = {
                        state: same(goldle.runCrew.getGuessGator().name, guessedGator.name) ? 'correct' : 'incorrect',
                        value: guessedGator.name,
                    }
                    newGuessState.degree = {
                        state: goldle.runCrew.checkDegree(guessedGator.degree),
                        value: guessedGator.degree
                    };
                    newGuessState.floor = {
                        state: goldle.runCrew.checkFloor(guessedGator.room[0]),
                        value: guessedGator.room[0]
                    };
                    newGuessState.country = {
                        state: goldle.runCrew.checkCountry(guessedGator.country),
                        value: guessedGator.country
                    };
                    goldle.guessStates.push(newGuessState);
                if (same(goldle.runCrew.getGuessGator().name, name)) {
                    goldle.status = 'won';
                    return {
                        "guessState": newGuessState,
                        "gameState": "won"
                    };
                } else if (goldle.numGuesses === 0) {
                    goldle.status = 'lost';
                    return {
                        "guessState": newGuessState,
                        "gameState": "lost"
                    };
                } else {
                    return {"guessState": newGuessState};
                }
            } else {
                let recommendations = goldle.runCrew.getRecommendations(name);
                return {
                    "error": "Gator not found",
                    "recommendation": recommendations[0]
                };
            }
        } else {
            return {"error": "Game not started"};
        }
    }

    rigGame = function(name) {
        if (this.runCrew.nameExists(name)) {
            this.guessGator = this.runCrew.setupGator(name);
            return this.guessGator;
        }
        return null;
    }

    getState = function() {
        return this.status;
    }
}

export default Goldle;