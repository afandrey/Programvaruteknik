'use strict';

let assert = require('chai').assert;
let QuitGame = require('../src/QuitGame.js');
let WordGenerator = require('../src/WordGenerator.js');
let Menu = require('../src/Menu.js');

describe('Hangman Game', function () {
    describe('QuitGame', function () {
        it('should be a string', function () {
            assert.isString(QuitGame());
        });

        it('should return Goodbye! message', function () {
            assert.equal(QuitGame(), 'Goodbye!');
        });
    });

    describe('generateRandomWord', function () {
        let testArray = ['buddy'];
        let testRandom = WordGenerator.generateRandomWord(testArray);

        it('should be a string', function () {
            assert.isString(testRandom);
        });

        it('should return random word "buddy"', function () {
            assert.equal(testRandom, 'buddy');
        });
    });

    describe('getWordList', function () {
        it('should return wordList array', function () {
            assert.isArray(Menu.getWordList());
        });
    });
});
