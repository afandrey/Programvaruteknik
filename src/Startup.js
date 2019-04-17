'use strict';

let menuOptions = require('./Menu.js');
let Nickname = require('./Nickname.js');
let clear = require('clear');

function start() {
    clear();
    // start the application with entering a nickname
    Nickname.setName();
    // present the menuoptions
    menuOptions();
}

module.exports = start;