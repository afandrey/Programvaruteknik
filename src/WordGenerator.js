'use strict';

function generateRandomWord(wordArray) {
    let randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];

    return randomWord;
}

function generateSecretWord(randomWord) {
    let secretWord = [];

    for (let i = 0; i < randomWord.length; i++) {
        secretWord.push('_ ');
    }

    return secretWord;
}

module.exports = {
    generateRandomWord: generateRandomWord,
    generateSecretWord: generateSecretWord
};