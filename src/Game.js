let rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
let clear = require('clear');

class Game {
    start() {
        // start the application with letting player enter their name
        clear();
        this.setName();
    }

    setName() {
        rl.question('Enter your name: ', (answer) => {
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
        let words = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

        let rnd = words[Math.floor(Math.random() * words.length)];

        return rnd;
    }

    playGame() {
        clear();
        // start the game with a random word 
        let word = this.randomWord();
        let secretWord = word.replace(/[a-z]/g, '_ ');

        // display the word with underscore instead of letters
        console.log(secretWord);

        // let the player guess
        rl.question('Make your guess: ', (letter) => {
            this.guess(letter, secretWord, word);
        });
    }

    guess(letter, secretWord, word) {
        let used = [];

        // check if letter has already been guessed
        if (used.includes(letter)) {
            console.log('Try another one...');
        }

        used.push(letter);
        for (let i = 0; i < word.length; i++) {
            if (letter === word[i]) {
                // exchange underscore for letter if it's a match
                console.log('its a match');
            }
        }
        // display all used letters
        console.log(used);
        console.log(secretWord);

        // TODO: need to be able to continue guessing
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