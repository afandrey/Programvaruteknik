let rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
let clear = require('clear');

class Game {

    // TODO: is the word random? can you get another word after winning/losing a game
    // TODO: after winning/losing game the menu is not right, faulty guesses pops up after what would you like to do

    constructor() {
        this.word = this.randomWord();
        this.used = [];
        this.secretWord = [];
        this.remainingTries = 10;
        this.nickname;
    }

    start() {
        clear();
        // start the application with letting player enter their name
        this.setName();
    }

    setName() {
        rl.question('Enter your name: ', (answer) => {
            this.nickname = answer;

            if (answer === "Admin") {
                console.log('Admin menuOptions');
            } else {
                // give the player the menu options
                this.menuOptions(answer);
            }
        });
    }

    menuOptions(name) {
        console.log();

        console.log(`Welcome, ${name}! Enter a number 1-3: `);
        console.log('1 = Play game');
        console.log('2 = View high scores');
        console.log('3 = Quit Game');

        rl.question('What would you like to do? ', (answer) => {
            if (answer === '1') {
                this.playGame(this.word);
            } else if (answer === '2') {
                // TODO: implement high score list if there is time
                console.log('Viewing high score list');
            } else if (answer === '3') {
                this.quitGame();
            } else {
                this.menuOptions(name);
                console.log('Wrong input');
            }
        });
    }

    randomWord() {
        let words = ['computer', 'dog', 'game'];

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
        if (this.secretWord.length === 0) {
            this.generateSecretWord();
        }

        // check if word is completed
        if (this.secretWord.join('').toString() === word) {
            console.log();
            console.log('Congratulations! You Won!');
            this.goBack();
        }

        // check if game is lost
        if (this.remainingTries <= 0) {
            console.log();
            console.log('Sorry! You lost the game');
            this.goBack();
        }

        // display all used letters
        console.log('\x1b[33m%s\x1b[0m', 'Faulty guesses: ', this.used);
        // display the secret word to the player
        console.log(this.secretWord.join(' '));

        // let the player guess
        rl.question(`You have ${this.remainingTries} tries left. Make your guess: `, (letter) => {
            if (letter === '1') {
                this.goBack();
            } else if (letter.length != 1) {
                console.log('Only one letter at a time!');
                this.playGame(word);
            } else {
                this.checkGuess(letter, word);
            }
        });
    }

    checkGuess(letter, word) {
        // check if letter has already been guessed
        if (this.used.includes(letter)) {
            console.log('You have already used this letter!');
            this.playGame(word);
        } else {
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
            this.playGame(word);
        }
    }

    goBack() {
        this.used = [];
        this.secretWord = [];
        this.remainingTries = 10;
        this.menuOptions(this.nickname);
    }

    quitGame() {
        // confirm that user wants to quit game
        rl.question('Are you sure you want to quit the game? ', (answer) => {
            if (answer === 'y' || answer === 'yes') {
                rl.close();
                clear();
            } else {
                this.menuOptions(this.nickname);
            }
        })
    }
}

module.exports = Game;