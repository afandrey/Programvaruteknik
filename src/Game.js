var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class Game {
    start() {
        // start the application with letting player enter their name
        this.setName();
    }

    setName() {
        rl.question('Enter your name: ', (answer) => {
            // give the player the menu options
            this.menuOptions(answer);
        });
    }

    menuOptions(name) {
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
                this.quitGame();
            }
        });
    }

    playGame() {
        // start the game with a random word 
        // (when this is working, implement choosing category as extra functionality)
        console.log('Begin the game!');
    }

    quitGame() {
        console.log('Quit application');
        rl.close();
    }

    viewHighScore() {
        // extra functionality (high score list)
        // count guesses and how long time the game took
        console.log('Viewing high score list');
    }

    timer() {
        // start a timer when game starts (add to high score functionality)
    }
}

module.exports = Game;