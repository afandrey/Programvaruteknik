'use strict';

let rl = require('readline-sync');
let wordGenerator = require('./WordGenerator.js');
let Highscore = require('./Highscore.js');
let Draw = require('./Draw.js');
let clear = require('clear');

let randomWord = [];
let secretWord = [];
let usedLetters = [];
let letter, wordLength;
let found = false;
let remainingTries = 8;

function start(data) {
    // start the game with generating random and secret word
    randomWord = wordGenerator.generateRandomWord(data);
    secretWord = wordGenerator.generateSecretWord(randomWord);
    wordLength = randomWord.length;

    // need this for double word dog breed
    if (secretWord.includes('-')) {
        wordLength--;
    }

    // let the player start guessing
    guess();
}

function displayWord() {
    console.log();
    console.log('\x1b[33m%s\x1b[0m', `Faulty guesses: ${usedLetters.join(' ').toUpperCase()}`);
    console.log(secretWord.join(' ').replace('-', ' ').toUpperCase());
}

function guess() {
    // let the player guess until there are no more blanks
    while (wordLength > 0) {
        // check if the player has any lives left
        if (remainingTries <= 0) {
            console.log('Sorry! You lost the game!');
            gameOver();
            return;
        }

        displayWord();
        letter = rl.question(`You have ${remainingTries} tries left. Make your guess: `);
        found = false;

        // check if the player wants to quit the game
        if (letter === '0') {
            gameOver();
            return;
        } else {
            validateGuess(letter);
        }
    }

    // display the word when it's completed
    winning();
    // save highscores to json file
    Highscore.saveHighscore(remainingTries);
    gameOver();
}

function winning() {
    clear();
    displayWord();
    console.log('Congratulations! You Won!');
}

function validateGuess(letter) {
    // make sure the guess is valid (not a number and one character at a time)
    if (letter.length != 1 || letter.length === 0 || isNaN(letter) === false) {
        console.log('Not a valid guess');
    } else if (usedLetters.includes(letter) || secretWord.includes(letter)) {
        // check that the letter hasn't already been guessed
        console.log('You have already used this letter!');
    } else {
        for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === letter && secretWord[i] !== letter) {
                // exchange underscore for the correct letter
                secretWord[i] = letter;
                wordLength--;
                found = true;
            }
        }
        if (!found) {
            // life lost when faulty guess
            remainingTries--;
            Draw.draw(remainingTries);
            usedLetters.push(letter);
        }
    }
}

function gameOver() {
    // reset all for a new game
    usedLetters = [];
    secretWord = [];
    randomWord = [];
    remainingTries = 8;
}

module.exports = start;