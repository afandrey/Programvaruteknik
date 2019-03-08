'use strict';

let rl = require('readline-sync');
let menu = require('./Menu.js');

function start() {
    setName();
    menu();
}

function setName() {
    let nickname = rl.question('Enter your name: ');

    if (nickname === "Admin") {
        console.log('TODO: Implement Admin menuOptions');
    } else if (nickname === "") {
        console.log('You must enter at least one character!');
    } else {
        console.log(`Welcome, ${nickname}`);
    }

}

module.exports = {
    start: start,
    setName: setName
};