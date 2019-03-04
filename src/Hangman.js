let rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
let clear = require('clear');

class Game {

    constructor() {
        this.word = '';
        this.used = [];
        this.secretWord = [];
        this.remainingTries = 8;
        this.nickname;
    }

    start() {
        clear();
        // start the application with letting player enter their name
        this.setName();
    }

    setName() {
        rl.question('Enter your name: ', (answer) => {
            clear();
            this.nickname = answer;

            if (answer === "Admin") {
                console.log('TODO: Implement Admin menuOptions');
            } else if (answer === "") {
                this.start();
                console.log('You must enter at least one character!');
            } else {
                // give the player the menu options
                console.log(`Welcome, ${answer}`);
                this.menuOptions();
            }
        });
    }

    menuOptions() {
        console.log();

        console.log(`Enter a number 1-3: `);
        console.log('1 = Play game');
        console.log('2 = View high scores');
        console.log('3 = Quit Game');

        rl.question('What would you like to do? ', (answer) => {
            if (answer === '1') {
                clear();
                console.log('Press: 0, to go back to main menu');
                this.word = this.generateRandomWord();
                this.playGame(this.word);
            } else if (answer === '2') {
                console.log('TODO: Implement high score list');
            } else if (answer === '3') {
                this.quitGame();
            } else {
                clear();
                this.menuOptions();
                console.log('Wrong input');
            }
        });
    }

    generateRandomWord() {
        let words = ['computer', 'dog', 'game', 'house', 'document'];

        let rnd = words[Math.floor(Math.random() * words.length)];

        return rnd;
    }

    generateSecretWord() {
        // exchange letters for underscores
        for (let i = 0; i < this.word.length; i++) {
            this.secretWord.push('_ ');
        }
    }

    playGame(word) {
        // if the word has not been made a secret, do it
        if (this.secretWord.length === 0) {
            this.generateSecretWord();
        }

        if (this.secretWord.join('').toString() === word) {
            // checks if word is completed = game is won
            clear();
            console.log('Congratulations! You Won!');
            console.log('The word was: ', this.secretWord.join(''));
            this.restartGame();
        } else if (this.remainingTries <= 0) {
            // checks if game is lost
            clear();
            console.log('Sorry! You lost the game');
            console.log('The word was: ', this.word);
            this.restartGame();
        } else {
            console.log();
            // display all used letters
            console.log('\x1b[33m%s\x1b[0m', 'Faulty guesses: ', this.used);
            // display the secret word to the player
            console.log(this.secretWord.join(' '));

            // let the player have a guess
            rl.question(`You have ${this.remainingTries} tries left. Make your guess: `, (letter) => {
                if (letter === '0') {
                    // go back to menu at any time during the game
                    this.restartGame();
                } else if (letter.length != 1) {
                    console.log('Only one letter at a time!');
                    this.playGame(word);
                } else if (isNaN(letter) === false) {
                    console.log('You can only input letters');
                    this.playGame(word);
                } else if (this.used.includes(letter) || this.secretWord.includes(letter)) {
                    console.log('You have already used this letter!');
                    this.playGame(word);
                } else {
                    this.validateGuess(letter, word);
                }
            });
        }
    }

    validateGuess(letter, word) {
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

        this.used.push(letter);
        this.remainingTries--;

        // continue guessing
        this.playGame(word);

    }

    restartGame() {
        this.used = [];
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