'use strict';

let rl = require('readline-sync');
let Hangman = require('./Hangman.js');

function menuOptions() {
    console.log();

    console.log(`Enter a number 1-3: `);
    console.log('1 = Play game');
    console.log('2 = View high scores');
    console.log('3 = Quit Game');

    let input = rl.question('What would you like to do? ');
    if (input === '1') {
        // TODO: quit game at any time
        Hangman.start();
    } else if (input === '2') {
        console.log('TODO: Implement high score list');
    } else if (input === '3') {
        console.log('TODO: Quit game');
    } else {
        // TODO: continue input until right input
        console.log('Wrong input');
    }
}

module.exports = menuOptions;