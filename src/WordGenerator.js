'use strict';

function generateRandomWord(wordArray) {
    // get random word from predefined list
    let randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];

    return randomWord;
}

function generateSecretWord(randomWord) {
    // exchange letters for underscore signs
    let secretWord = [];

    for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === " ") {   
            secretWord.push('-');
        } else {
            secretWord.push('_ ');
        }
    }
    return secretWord;
}

module.exports = {
    generateRandomWord: generateRandomWord,
    generateSecretWord: generateSecretWord
};