let rl = require('readline-sync');
let nickname = '';

function setName() {
    // ask the player for their name
    let input = rl.question('Enter your name: ');

    if (input === "") {
        console.log('You must enter at least one character!');
        setName();
    } else {
        nickname = input;
        console.log(`Welcome, ${input}`);
    }
}

function getName() {
    return nickname;
}

module.exports = {
    setName: setName,
    getName: getName
}