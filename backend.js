import { getCountryCode, getCountryData } from 'countries-list';

import { goldleGators, goldleFacultyMap } from './assets.js';

const gameStates = ['inactive', 'started', 'won', 'lost'];
const degreeStates = ['different faculty', 'same faculty', 'correct', 'none'];
const floorStates = ['incorrect', 'neighbour', 'correct', 'none'];
const countryStates = ['different continent', 'same continent', 'correct', 'none'];

function parseGators() {
    let gators = goldleGators;
    return gators;
}

function getGatorNames(gators) {
    let gatorNames = [];
    for (let i = 0; i < gators.length; i++) {
        gatorNames.push(gators[i].name);
    }
    return gatorNames;

}

function parseFaculties() {
    let facultyMap = new Map();
    for (let i = 0; i < goldleFacultyMap["value"].length; i++) {
        facultyMap.set(goldleFacultyMap["value"][i][0], goldleFacultyMap["value"][i][1]);
    }
    return facultyMap;
}

function same(val1, val2) {
    return val1.toLowerCase() === val2.toLowerCase();
}

class Goldle {
    headerRow;
    gators;
    gatorNames;
    facultyMap;
    guessGator;
    guessStates;
    numGuesses;
    status;

    constructor() {
        this.headerRow = [];
        this.gators = [];
        this.gatorNames = [];
        this.facultyMap = new Map();
        this.guessGator = {};
        this.guessStates = [];
        this.numGuesses = 0;
        this.status = 'inactive';
    }
    
    setupGators = function() {
        const goldle = this;

        goldle.gators = parseGators();
        goldle.gatorNames = getGatorNames(goldle.gators);

        goldle.facultyMap = parseFaculties();
        console.log('GAME HAS BEEN SET UP!');
    }

    getGatorByName = function(name) {
        for (let i = 0; i < this.gators.length; i++) {
            if (same(this.gators[i].name, name)) {
                return this.gators[i];
            }
        }
        return null;
    }
    
    getRandomGator = function() {
        let randomIndex = Math.floor(Math.random() * this.gators.length);
        return this.gators[randomIndex];
    }

    startGame = function() {
        if (same(this.status, 'started')) {
            console.log('Game already started');
            return this.status;
        }

        this.setupGators('gator-data.csv', 'faculty-data.csv');
        this.guessGator = this.getRandomGator();
        this.numGuesses = 6;
        this.status = 'started';
        console.log('The game has been started!');
        return this.status;
    }

    searchName = function(name) {
        let foundNames = [...this.gatorNames];
        foundNames = foundNames.filter((val) => val.toLowerCase().includes(name.toLowerCase()));
        return foundNames;
    }

    nameExists = function(name) {
        return this.gatorNames.includes(name);
    }

    getFaculty = function(degree) {
        degree = degree.toLowerCase();
        for (let [key, value] of this.facultyMap.entries()) {
            if (value.includes(degree)) {
                return key;
            }
        }
        return null;
    }

    getFaculties = function(degree) {
        let faculties = [];

        for (let i = 0; i < degree.split('/').length; i++) {
            let faculty = this.getFaculty(degree.split('/')[i].trim());
            if (faculty !== null) {
                faculties.push(faculty);
            }
        }
        
        return faculties;
    }

    checkDegree = function(guessedDegree) {

        const guessDegree = this.guessGator.degree;

        if (same(guessedDegree, guessDegree)) {
            return 'correct';
        } else if (same(guessedDegree, "N/A")) {
            return 'none';
        }

        let guessedFaculties = this.getFaculties(guessedDegree);

        let guessFaculties = this.getFaculties(guessDegree);

        for (let i = 0; i < guessedFaculties.length; i++) {
            if (guessFaculties.includes(guessedFaculties[i])) {
                return 'same faculty';
            }
        }

        return 'different faculty';
    }

    checkFloor = function(guessedFloor) {

        const guessFloor = this.guessGator.room[0];

        if (same(guessedFloor, guessFloor)) {
            return 'correct';
        } else if (same(guessFloor, "N/A")) {
            return 'none';
        } else if (Math.abs(guessedFloor - guessFloor) === 1) {
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
            return 'same continent';
        } else {
            return 'different continent';
        }
    }

    guessName = function(name) {
        const goldle = this;
        if (same(goldle.status, 'started')) {
            if (goldle.nameExists(name)) {
                console.log('Guess ' + (7 - goldle.numGuesses).toString() + ' of 6');
                let guessedGator = goldle.getGatorByName(name);
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
                    console.log('You guessed the gator!');
                    console.log('Thank you for playing Goldle!');
                    return {
                        "guessState": newGuessState,
                        "gameState": "won"
                    };
                } else if (goldle.numGuesses === 0) {
                    goldle.status = 'lost';
                    console.log('You failed to guess the gator...');
                    console.log('The gator was ' + goldle.guessGator.name + '!');
                    goldle.showGator();
                    console.log('Better luck next time!');
                    return {
                        "guessState": newGuessState,
                        "gameState": "lost"
                    };
                } else {
                    console.log('You guessed wrong!');
                    return {"guessState": newGuessState};
                }
            } else {
                console.log('Gator not found');
                let recommendations = goldle.searchName(name);
                let recommendationText = "";
                if (recommendations.length > 0) {
                    recommendationText = 'Did you mean ' + recommendations[0] + '?';
                    console.log(recommendationText);
                }
                return {
                    "error": "Gator not found",
                    "recommendation": recommendations[0]
                };
            }
        } else {
            console.log('Game not started');
            return {"error": "Game not started"};
        }
    }

    showGator = function() {

        const goldle = this;
        if (goldle.guessGator) {
            return goldle.guessGator;
        }
       
    }

    rigGame = function(name) {
        if (this.nameExists(name)) {
            this.guessGator = this.getGatorByName(name);
            console.log('The gator has been rigged to ' + name + '!');
        } else {
            console.log('Gator not found');
        }
    }

    getState = function() {
        return this.status;
    }
}

export default Goldle;