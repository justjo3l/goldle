import same from '../utils/helper.js';

class GoldleRunCrew {
    constructor() {
        this.gators = [];
        this.gatorNames = [];
        this.facultyMap = new Map();
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
}

export default GoldleRunCrew;