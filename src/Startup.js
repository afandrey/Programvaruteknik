'use strict';

let rl = require('readline-sync');
let menu = require('./Menu.js');

function start() {
    console.log(setName());
    menu();
}

function setName() {
    // TODO: use more return instead of console.log where it's possible
    let nickname = rl.question('Enter your name: ');

    if (nickname === "Admin") {
        // TODO: add password to enter
        // TODO: implement Admin menuOptions
        console.log('Admin menuOptions');
    } else if (nickname === "") {
        console.log('You must enter at least one character!');
    } else {
        return `Welcome, ${nickname}`;
    }

}

module.exports = {
    start: start,
    setName: setName
};