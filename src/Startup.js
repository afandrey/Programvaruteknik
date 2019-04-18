'use strict';

let Menu = require('./Menu.js');
let Nickname = require('./Nickname.js');
let clear = require('clear');

function start() {
    clear();
    // start the application with entering a nickname
    Nickname.setName();
    // present the Menu
    Menu.menuOptions();
}

module.exports = start;