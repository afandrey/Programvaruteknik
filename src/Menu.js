'use strict';

let rl = require('readline-sync');
let Hangman = require('./Hangman.js');
let Highscore = require('./Highscore.js');
let QuitGame = require('./QuitGame.js');
let data = require('../data/wordList.json');
let wordArray = [];

function menuOptions() {
    console.log();

    console.log(`Enter a number 0-2: `);
    console.log('0 = Quit Game');
    console.log('1 = Play game');
    console.log('2 = View high scores');

    let input = rl.question('What would you like to do? ');
    if (input === '1') {
        // start the game
        chooseLevel();
        Hangman(wordArray);
        return menuOptions();
    } else if (input === '2') {
        // view highscore list
        Highscore.getHighscore();
    } else if (input === '0') {
        // quit the game
        let quit = rl.question('Are you sure you want to quit the game? Y/N ')
        if (quit === 'Y' || quit === 'y') {
            console.log(QuitGame());
        } else {
            menuOptions();
        }
    } else {
        console.log('Wrong input');
        menuOptions();
    }
}

function chooseLevel() {
    // let the player choose a level
    let input = rl.question('Choose a level 1-3 or type in "r" for a random level: ');
    if (input === '1') {
        wordArray = data.levelOne;
    } else if (input === '2') {
        wordArray = data.levelTwo;
    } else if (input === '3') {
        wordArray = data.levelThree;
    } else if (input === 'r') {
        wordArray = data.levelOne, data.levelTwo, data.levelThree;
    } else if (input.toLocaleLowerCase() === 'test') {
        console.log('The test word is: dog');
        wordArray = data.testWord;
    }
    else {
        return menuOptions();
    }
}

function getWordList() {
    wordArray.push(data);
    return wordArray;
}

module.exports = {
    menuOptions: menuOptions,
    getWordList: getWordList
};