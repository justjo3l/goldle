import same from '../utils/helper.js';

class GoldleRunCrew {
    constructor() {
        this.gators = [];
        this.gatorNames = [];
        this.facultyMap = new Map();
        this.guessGator = null;
    }

    // Setup functions
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

    setupGator = function(name) {
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
    getGatorByName = function(name) {
        for (let i = 0; i < this.gators.length; i++) {
            if (same(this.gators[i].name, name)) {
                return this.gators[i];
            }
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

    // Check functions
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

        let guessedFaculties = this.getFaculties(guessedDegree);

        let guessFaculties = this.getFaculties(guessDegree);

        for (let i = 0; i < guessedFaculties.length; i++) {
            if (guessFaculties.includes(guessedFaculties[i])) {
                return 'same-faculty';
            }
        }

        return 'incorrect';
    }
}

export default GoldleRunCrew;