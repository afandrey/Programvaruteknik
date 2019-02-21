let rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
let clear = require('clear');

class Game {

    constructor() {
        this.used = [];
        this.secretWord = [];
        this.remainingTries = 10;
        this.nickname;
    }

    // start the application with letting player enter their name
    start() {
        clear();
        this.setName();
    }

    setName() {
        rl.question('Enter your name: ', (answer) => {
            this.nickname = answer;
            // give the player the menu options
            this.menuOptions(answer);
        });
    }

    menuOptions(name) {
        clear();

        console.log(`Welcome, ${name}! Enter a number 1-3: `);
        console.log('1 = Play game');
        console.log('2 = View high scores');
        console.log('3 = Quit');

        rl.question('What would you like to do? ', (answer) => {
            if (answer === '1') {
                this.playGame();
            } else if (answer === '2') {
                // TODO: implement high score list if there is time
                console.log('Viewing high score list');
            } else if (answer === '3') {
                this.closeApplication();
            } else {
                console.log('Wrong input');
                this.menuOptions(name);
            }
        });
    }

    randomWord() {
        let words = ['january', 'march', 'may'];

        let rnd = words[Math.floor(Math.random() * words.length)];

        // exchange letters for underscores
        for (let i = 0; i < rnd.length; i++) {
            this.secretWord.push('_ ');
        }

        return rnd;
    }

    playGame() {
        clear();

        // start the game with a random word 
        let word = this.randomWord();

        // display the secret word to the player
        console.log(this.secretWord.join(' '));

        // let the player guess
        rl.question(`You have ${this.remainingTries} tries left. Make your guess: `, (letter) => {
            this.guess(letter, word);
        });
    }

    guess(letter, word) {
        // check if letter has already been guessed
        if (this.used.includes(letter)) {
            console.log('You have already used this letter!');
        } else {
            // if letter has not been guessed, push to array
            // TODO: do not push if it's a match?
            this.used.push(letter);
        }

        // check if guessed letter matches a letter in the word
        for (let i = 0; i < word.length; i++) {
            if (letter === word[i]) {
                // if it's a match, exchange underscore for letter
                this.secretWord[i] = letter;
            } 
            // TODO: reduce this.remainingTries when the letter is not a match
        }

        // display secretWord after guessing a letter
        clear();
        console.log(this.secretWord.join(' '));

        // display all used letters
        console.log('\x1b[33m%s\x1b[0m', this.used);

        // continue guessing until the word is completed or until remainingTries = 0
        rl.question(`You have ${this.remainingTries} tries left. Make your guess: `, (letter) => {
            this.guess(letter, word);
        });

        if (this.secretWord.join('').toString() === word) {
            clear();
            console.log('Congratulations! You Won!');
            // TODO: go back to menuOptions instead
            this.closeApplication();
        }

        if (this.remainingTries === 0) {
            clear();
            // TODO: go back to menuOptions
            console.log('Sorry! You lost the game');
        }
    }

    endGame() {
        // TODO: go back to menu if game is ended before finsihed
        console.log('Go back to menu');
    }

    closeApplication() {
        // TODO: confirm termination
        console.log('Close application');
        rl.close();
    }
}

module.exports = Game;