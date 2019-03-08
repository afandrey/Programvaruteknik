'use strict';

let rl = require('readline-sync');

function QuitGame() {
    let answer = rl.question('Are you sure you want to quit the game? Y/N ');
    
    if (answer === 'Y' || answer === 'y') {
        return 'Goodbye!';
    } else {
        return false;
    }
}

module.exports = QuitGame;