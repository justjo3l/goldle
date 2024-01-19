import fs from 'fs';
import Papa from 'papaparse';
import { getCountryCode, getCountryData } from 'countries-list';

const gameStates = ['inactive', 'started', 'won', 'lost'];
const degreeStates = ['different faculty', 'same faculty', 'correct', 'none'];
const floorStates = ['incorrect', 'neighbour', 'correct', 'none'];
const countryStates = ['different continent', 'same continent', 'correct', 'none'];

function parseGators(gatorFile) {
    let gators = [];
    Papa.parse(gatorFile, {
        worker: true,
        complete: function(results) {
            for (let i = 0; i < results.data.length; i++) {
                if (i !== 0) {
                    let gator = {};
                    gator.name = results.data[i][1];
                    gator.degree = results.data[i][2];
                    gator.room = results.data[i][3];
                    gator.country = results.data[i][4];
                    gators.push(gator);
                }
            }
        }
    });
    return gators;
}

function getGatorNames(gators) {
    let gatorNames = [];
    for (let i = 0; i < gators.length; i++) {
        gatorNames.push(gators[i].name);
    }
    return gatorNames;

}

function parseFaculties(facultyFile) {
    let facultyMap = new Map();
    Papa.parse(facultyFile, {
        worker: true,
        complete: function(results) {
            for (let i = 0; i < results.data.length; i++) {
                if (i !== 0) {
                    if (facultyMap.get(results.data[i][1]) === undefined) {
                        facultyMap.set(results.data[i][1], []);
                    }
                    facultyMap.get(results.data[i][1]).push(results.data[i][0]);
                }
            }
        }
    });
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
    
    setupGators = function(gatorData, facultyData) {
        const goldle = this;

        const gatorFile = fs.readFileSync(gatorData, 'utf8');
        goldle.gators = parseGators(gatorFile);
        goldle.gatorNames = getGatorNames(goldle.gators);

        const facultyFile = fs.readFileSync(facultyData, 'utf8');
        goldle.facultyMap = parseFaculties(facultyFile);
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
            return;
        }

        this.setupGators('gator-data.csv', 'faculty-data.csv');
        this.guessGator = this.getRandomGator();
        this.numGuesses = 6;
        this.status = 'started';
        console.log('The game has been started!');
        return;
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

        if (same(guessDegree, "N/A")) {
            return 'none';
        }

        if (same(guessedDegree, guessDegree)) {
            return 'correct';
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

        if (same(guessFloor, "N/A")) {
            return 'none';
        }

        if (same(guessedFloor, guessFloor)) {
            return 'correct';
        } else if (Math.abs(guessedFloor - guessFloor) === 1) {
            return 'neighbour';
        } else {
            return 'incorrect';
        }
    }

    checkCountry = function(guessedCountry) {

        const guessCountry = this.guessGator.country;

        if (same(guessCountry, "N/A")) {
            return 'none';
        }

        let guessedContinent = getCountryData(getCountryCode(guessedCountry)).continent;
        let guessContinent = getCountryData(getCountryCode(guessCountry)).continent;

        if (same(guessedCountry, guessCountry)) {
            return 'correct';
        } else if (same(guessedContinent, guessContinent)) {
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
                if (same(goldle.guessGator.name, name)) {
                    goldle.status = 'won';
                    console.log('You guessed the gator!');
                    console.log('Thank you for playing Goldle!');
                    return;
                } else if (goldle.numGuesses === 0) {
                    goldle.status = 'lost';
                    console.log('You failed to guess the gator...');
                    console.log('The gator was ' + goldle.guessGator.name + '!');
                    goldle.showGator();
                    console.log('Better luck next time!');
                    return;
                } else {
                    let newGuessState = {}
                    newGuessState.name = guessedGator.name;
                    newGuessState.degree = goldle.checkDegree(guessedGator.degree);
                    newGuessState.floor = goldle.checkFloor(guessedGator.room[0]);
                    newGuessState.country = goldle.checkCountry(guessedGator.country);
                    goldle.guessStates.push(newGuessState);
                    console.log(newGuessState);
                    console.log('You guessed wrong!');
                    return;
                }
            } else {
                console.log('Gator not found');
                let recommendations = goldle.searchName(name);
                if (recommendations.length > 0) {
                    console.log('Did you mean ' + recommendations[0] + '?');
                }
                return;
            }
        } else {
            console.log('Game not started');
            return;
        }
    }

    showGator = function() {

        const goldle = this;
        if (goldle.guessGator) {
            console.log(goldle.guessGator);
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
}

export default Goldle;