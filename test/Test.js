'use strict';

let assert = require('chai').assert;
let QuitGame = require('../src/QuitGame.js');
let WordGenerator = require('../src/WordGenerator.js');
let Highscore = require('../src/Highscore.js');

describe('Hangman Game', function () {
    describe('QuitGame', function () {
        it('should return Goodbye! message', function () {
            assert.equal(QuitGame(), 'Goodbye!');
        });
    });

    describe('generateRandomWord', function () {
        let testArray = ['buddy'];
        let testRandom = WordGenerator.generateRandomWord(testArray);
        it('should return random word "buddy"', function () {
            assert.equal(testRandom, 'buddy');
        });
    });

    describe('Highscore', function () {
        it('should return highscore list array', function () {
            assert.isArray(Highscore());
        })
    })
});
