'use strict';

let rl = require('readline-sync');
let wordGenerator = require('./WordGenerator.js');
let data = require('../wordList.json');

let randomWord = [];
let secretWord = [];
let usedLetters = [];
let letter, wordLength;
let found = false;
let remainingTries = 8;

function start() {
    randomWord = wordGenerator.generateRandomWord(data.words);
    secretWord = wordGenerator.generateSecretWord(randomWord);
    wordLength = randomWord.length;
    guess();
}


function guess() {
    while (wordLength > 0) {
        if (remainingTries <= 0) {
            console.log('Sorry! You lost the game!');
            gameOver();
            return;
        }

        console.log();
        console.log('\x1b[33m%s\x1b[0m', 'Faulty guesses: ', usedLetters);
        console.log(secretWord.join(' '));
        letter = rl.question(`You have ${remainingTries} tries left. Make your guess: `);
        found = false;
        validateGuess(letter);
    }
    console.log('Congratulations! You Won!');
    gameOver();
}

function validateGuess(letter) {
    if (letter === '0') {
        gameOver();
    } else if (letter.length !== 1 && letter.length === 0 && isNaN(letter) === false) {
        console.log('Not a valid guess');
    } else if (usedLetters.includes(letter) || secretWord.includes()) {
        console.log('You have already used this letter!');
    } else {
        for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === letter && secretWord[i] !== letter) {
                secretWord[i] = letter;
                wordLength--;
                found = true;
            }
        }
        if (!found) {
            remainingTries--;
            usedLetters.push(letter);
        }
    }
}

function gameOver() {
    usedLetters = [];
    secretWord = [];
    randomWord = [];
    remainingTries = 8;
}

module.exports = {
    start: start
}