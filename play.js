import Goldle from "./backend.js";
import readline from "readline";
import goldleText from "./assets.js";

const handleInput = function() {
    r1.question('Enter a command: ', command => {
        if (command === 'quit') {
            process.exit(0);
        } else if (command === 'start') {
            process.stdout.write('\u001B[2J\u001B[0;0f');
            goldle.startGame();
        } else if (command.startsWith('guess')) {
            const name = command.substring(6);
            goldle.guessName(name);
        } else if (command === 'show') {
            goldle.showGator();
        } else if (command.startsWith('rig')) {
            goldle.rigGame(command.substring(4));
        } else {
            console.log('Command not recognized');
        }
        handleInput();
    });
}

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let goldle = new Goldle();
goldle.setupGators('./gator-data.csv', './faculty-data.csv');

console.log();
console.log(goldleText);
console.log();
console.log("WELCOME TO GOLDLE!!!");
handleInput();