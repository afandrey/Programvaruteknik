let rl = require('readline-sync');

let words = ['computer', 'dog', 'game', 'house', 'document'];
let secretWord = [];
let usedLetters = [];
let remainingTries = 8;

function start() {
    generateRandomWord();
    setName();
}

function generateRandomWord() {
    let rnd = words[Math.floor(Math.random() * words.length)];
    console.log('random: ' + rnd);

    for (let i = 0; i < rnd.length; i++) {
        secretWord.push('_ ');
    }
    console.log('secret: ' + secretWord.join(''));
}

function setName() {
    let nickname = rl.question('Enter your name: ');

    if (nickname === "Admin") {
        console.log('TODO: Implement Admin menuOptions');
    } else if (nickname === "") {
        console.log('You must enter at least one character!');
    } else {
        // give the player the menu options
        console.log(`Welcome, ${nickname}`);
        guess();
    }
}

function guess() {
    let letter = rl.question('Make your guess: ');
    validateGuess(letter);
}

function validateGuess(letter) {
    console.log('Validate guess: ' + letter);
}

module.exports = {
    start: start
}