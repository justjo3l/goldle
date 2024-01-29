import { getCountryCode, getCountryData } from 'countries-list';

import { goldleGators, goldleFacultyMap } from '../assets.js';

import same from '../utils/helper.js';

import GoldleRunCrew from './goldleRunCrew.js';

const gameStates = ['inactive', 'started', 'won', 'lost'];
const degreeStates = ['incorrect', 'same-faculty', 'correct', 'none'];
const floorStates = ['incorrect', 'neighbour', 'correct', 'none'];
const countryStates = ['incorrect', 'same-continent', 'correct', 'none'];

const GUESSES = 6;

class Goldle {

    constructor() {
        this.gators = [];
        this.runCrew = new GoldleRunCrew();
        this.guessGator = null;
        this.guessStates = [];
        this.numGuesses = 0;
        this.status = 'inactive';
    }
    
    setupGators = function() {
        const goldle = this;

        goldle.gators = goldleGators;
        goldle.gatorNames = goldle.runCrew.setupGatorNames(goldleGators);

        goldle.facultyMap = goldle.runCrew.setupFacultyMap(goldleFacultyMap);
        return {};
    }

    startGame = function(numGuesses) {
        if (same(this.status, 'started')) {
            return this.status;
        }

        this.setupGators('gator-data.csv', 'faculty-data.csv');
        this.guessGator = this.gators[Math.floor(Math.random() * this.gators.length)];
        this.numGuesses = numGuesses || GUESSES;
        this.status = 'started';
        return this.status;
    }

    nameExists = function(name) {
        return this.gatorNames.includes(name);
    }

    checkDegree = function(guessedDegree) {

        const guessDegree = this.guessGator.degree;

        if (same(guessedDegree, guessDegree)) {
            return 'correct';
        } else if (same(guessedDegree, "N/A")) {
            return 'none';
        }

        let guessedFaculties = this.runCrew.getFaculties(guessedDegree);

        let guessFaculties = this.runCrew.getFaculties(guessDegree);

        for (let i = 0; i < guessedFaculties.length; i++) {
            if (guessFaculties.includes(guessedFaculties[i])) {
                return 'same-faculty';
            }
        }

        return 'incorrect';
    }

    checkFloor = function(guessedFloor) {

        const guessFloor = this.guessGator.room[0];

        if (parseInt(guessedFloor) === parseInt(guessFloor)) {
            return 'correct';
        } else if (same(this.guessGator.room, "N/A")) {
            return 'none';
        } else if (Math.abs(parseInt(guessedFloor) - parseInt(guessFloor)) === 1) {
            return 'neighbour';
        } else {
            return 'incorrect';
        }
    }

    checkCountry = function(guessedCountry) {

        const guessCountry = this.guessGator.country;

        let guessedContinent = getCountryData(getCountryCode(guessedCountry)).continent;
        let guessContinent = getCountryData(getCountryCode(guessCountry)).continent;

        if (same(guessedCountry, guessCountry)) {
            return 'correct';
        } else if (same(guessCountry, "N/A")) {
            return 'none';
        } else if (guessedContinent && guessContinent && same(guessedContinent, guessContinent)) {
            return 'same-continent';
        } else {
            return 'incorrect';
        }
    }

    guessName = function(name) {
        const goldle = this;
        if (same(goldle.status, 'started')) {
            if (goldle.nameExists(name)) {
                let guessedGator = goldle.runCrew.getGatorByName(name);
                goldle.numGuesses--;
                let newGuessState = {}
                    newGuessState.name = {
                        state: same(goldle.guessGator.name, guessedGator.name) ? 'correct' : 'incorrect',
                        value: guessedGator.name,
                    }
                    newGuessState.degree = {
                        state: goldle.checkDegree(guessedGator.degree),
                        value: guessedGator.degree
                    };
                    newGuessState.floor = {
                        state: goldle.checkFloor(guessedGator.room[0]),
                        value: guessedGator.room[0]
                    };
                    newGuessState.country = {
                        state: goldle.checkCountry(guessedGator.country),
                        value: guessedGator.country
                    };
                    goldle.guessStates.push(newGuessState);
                if (same(goldle.guessGator.name, name)) {
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
                let recommendationText = "";
                if (recommendations.length > 0) {
                    recommendationText = 'Did you mean ' + recommendations[0] + '?';
                }
                return {
                    "error": "Gator not found",
                    "recommendation": recommendations[0]
                };
            }
        } else {
            return {"error": "Game not started"};
        }
    }

    showGator = function() {

        const goldle = this;
        if (goldle.guessGator) {
            return goldle.guessGator;
        }

        return null;
       
    }

    rigGame = function(name) {
        if (this.nameExists(name)) {
            this.guessGator = this.runCrew.getGatorByName(name);
            return this.guessGator;
        }
        return null;
    }

    getState = function() {
        return this.status;
    }
}

export default Goldle;