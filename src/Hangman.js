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

    start() {
        // start the application with letting player enter their name
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
        console.log(`Welcome, ${name}! What would you like to do?`);
        console.log('1 = Play game');
        console.log('2 = View high scores');
        console.log('3 = Quit');
        rl.question('Enter a number 1-3: ', (option) => {
            if (option === '1') {
                this.playGame();
            } else if (option === '2') {
                this.viewHighScore();
            } else if (option === '3') {
                this.quitGame();
            } else {
                console.log('Wrong input');
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

        console.log(this.secretWord.join(' '));

        // let the player guess
        console.log(`You have: ${this.remainingTries} lives`);
        rl.question('Make your guess: ', (letter) => {
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

        for (let i = 0; i < word.length; i++) {
            if (letter === word[i]) {
                // exchange underscore for letter if it's a match
                this.secretWord[i] = letter;
            }
            // TODO: reduce this.remainingTries when the letter is not a match
        }

        // display secretWord after guessing a letter
        console.log();
        console.log(this.secretWord.join(' '));

        // display all used letters
        console.log('\x1b[33m%s\x1b[0m', this.used);
        console.log(`You have: ${this.remainingTries} lives`);

        rl.question('Make your guess: ', (letter) => {
            this.guess(letter, word);
        });

        if (this.secretWord.join('').toString() === word) {
            clear();
            console.log('Congratulations! You Won!');
            // TODO: go back to menuOptions instead
            this.quitGame();
        }

        if (this.remainingTries === 0) {
            clear();
            console.log('Sorry! You lost the game');
        }
    }

    quitGame() {
        console.log('Quit application');
        rl.close();
    }

    viewHighScore() {
        // extra functionality (high score list)
        console.log('Viewing high score list');
    }
}

module.exports = Game;