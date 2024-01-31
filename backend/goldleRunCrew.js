import { getCountryCode, getCountryData, continents } from 'countries-list';

import { goldleGators, goldleFacultyMap } from '../assets/assets.js';

import same from '../utils/helper.js';

class GoldleRunCrew {
    constructor() {
        this.gators = [];
        this.gatorNames = [];
        this.facultyMap = new Map();
        this.guessGator = null;
    }

    // Setup functions
    setupGators = function() {

        this.gators = goldleGators;
        this.setupGatorNames(goldleGators);
        this.setupFacultyMap(goldleFacultyMap);
        return {};
    }

    setupGatorNames = function(gators) {
        this.gatorNames = [];
        this.gators = gators;
        for (let i = 0; i < gators.length; i++) {
            this.gatorNames.push(gators[i].name);
        }

        return this.gatorNames;
    }

    setupFacultyMap = function(facultyMap) {
        this.facultyMap = new Map();
        for (let i = 0; i < facultyMap["value"].length; i++) {
            this.facultyMap.set(facultyMap["value"][i][0], facultyMap["value"][i][1]);
        }
        return {};
    }

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
    }

    // Get functions
    getGatorByName = function(name, exact=true) {
        let options = [];
        for (let i = 0; i < this.gators.length; i++) {
            if (same(this.gators[i].name, name)) {
                return this.gators[i];
            } else if (!exact) {
                const gatorNameSplit = this.gators[i].name.toLowerCase().split(' ');
                const guessNameSplit = name.toLowerCase().split(' ');
                if (guessNameSplit.some(name => gatorNameSplit.includes(name))) {
                    options.push(this.gators[i]);
                }
            }
        }

        if (options.length == 1) {
            return options[0];
        }

        return null;
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

    getRecommendations = function(name) {
        let foundNames = [...this.gatorNames];
        foundNames = foundNames.filter((val) => val.toLowerCase().includes(name.toLowerCase()));
        return foundNames;
    }

    getGuessGator = function() {
        return this.guessGator;
       
    }

    // Check functions
    nameExists = function(name) {
        for (let i = 0; i < this.gatorNames.length; i++) {
            if (same(this.gatorNames[i], name)) {
                return true;
            }
        }

        return false;
    }

    // Guess Check functions
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
            hint: hint
        }
    }

    checkDegree = function(guessedDegree) {

        const guessDegree = this.guessGator.degree;

        let state = 'incorrect';
        let hint = '';

        let guessedFaculties = [];

        if (same(guessedDegree, guessDegree)) {
            state = 'correct';
            hint = '👍';
        } else if (same(guessedDegree, "N/A")) {
            state = 'none';
        } else {
            guessedFaculties = this.getFaculties(guessedDegree);

            let guessFaculties = this.getFaculties(guessDegree);

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
        }
    }

    checkFloor = function(guessedFloor) {

        const guessFloor = this.guessGator.room[0];

        let state = 'incorrect';
        let hint = '';

        if (parseInt(guessedFloor) === parseInt(guessFloor)) {
            state = 'correct';
            hint = '👍';
        } else if (same(guessedFloor.toString(), "N/A")) {
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
        }
    }

    checkCountry = function(guessedCountry) {

        const guessCountry = this.guessGator.country;

        let guessedContinent = getCountryData(getCountryCode(guessedCountry)).continent;
        let guessContinent = getCountryData(getCountryCode(guessCountry)).continent;

        let state = 'incorrect';
        let hint = '';

        if (same(guessedCountry, guessCountry)) {
            state = 'correct';
            hint = '👍';
        } else if (same(guessedCountry, "N/A")) {
            state = 'none';
        } else if (guessedContinent && guessContinent && same(guessedContinent, guessContinent)) {
            state = 'same-continent';
            let guessContinentFullName = continents[guessContinent];
            hint = 'The gator is from ' + guessContinentFullName;
        } else {
            hint = 'The gator is from a different continent';
        }

        return {
            state: state,
            value: guessedCountry,
            hint: hint,
        }
    }
}

export default GoldleRunCrew;