let rl = require('readline-sync');
let clear = require('clear');

class Game {

    playGame(word) {
        // if the word has not been made a secret, do it
        if (this.secretWord.length === 0) {
            this.generateSecretWord();
        }

        if (this.secretWord.join('').toString() === word) {
            // checks if word is completed = game is won
            console.log('Congratulations, you Won!');
            this.goBack();
        } else if (this.remainingTries <= 0) {
            // checks if game is lost
            clear();
            console.log('Sorry, you lost the game!');
            console.log('The word was: ', this.word);
            this.goBack();
        } else {
            console.log();
            // display all usedLetters letters
            console.log('\x1b[33m%s\x1b[0m', 'Faulty guesses: ', this.usedLetters);
            // display the secret word to the player
            console.log(this.secretWord.join(' '));

            // let the player have a guess
            rl.question(`You have ${this.remainingTries} tries left. Make your guess: `, (letter) => {
                if (letter === '0') {
                    // go back to menu at any time during the game
                    this.goBack();
                } else if (letter.length != 1) {
                    console.log('Only one letter at a time!');
                    this.playGame(word);
                } else if (isNaN(letter) === false) {
                    console.log('You can only input letters');
                    this.playGame(word);
                } else if (this.usedLetters.includes(letter) || this.secretWord.includes(letter)) {
                    console.log('You have already usedLetters this letter!');
                    this.playGame(word);
                } else {
                    this.checkGuess(letter, word);
                }
            });
        }
    }

    checkGuess(letter, word) {
        // check if guessed letter matches a letter in the word
        for (let i = 0; i < word.length; i++) {
            if (letter === word[i]) {
                // if it's a match, exchange underscore for letter
                this.secretWord[i] = letter;
                // continue guessing
                this.playGame(word);
                return;
            }
        }

        this.usedLetters.push(letter);
        this.remainingTries--;

        // continue guessing
        this.playGame(word);

    }

    goBack() {
        this.usedLetters = [];
        this.secretWord = [];
        this.remainingTries = 8;
        this.menuOptions();
    }

    quitGame() {
        // confirm that user wants to quit game
        rl.question('Are you sure you want to quit the game? ', (answer) => {
            if (answer === 'y' || answer === 'yes') {
                rl.close();
                clear();
            } else {
                this.menuOptions();
            }
        })
    }
}

module.exports = Game;