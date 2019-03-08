// https://codeburst.io/javascript-unit-testing-using-mocha-and-chai-1d97d9f18e71
let assert = require('chai').assert;
let QuitGame = require('../src/QuitGame.js');

describe('Hangman Game', function () {
    describe('Quit', function () {
        it('should return Goodbye! message', function () {
            assert.equal(QuitGame(), 'Goodbye!');
        });

        it('should be a string', function () {
            assert.isString(QuitGame());
        });
    });
});
