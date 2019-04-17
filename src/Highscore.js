'use strict';

let Nickname = require('./Nickname.js');
let fs = require('fs');

function getHighscore() {
    // read the json file
    fs.readFile('./data/highscore.json', 'utf-8', function (err, data) {
        if (err) throw err;

        let arrayOfObjects = JSON.parse(data);
        console.log(arrayOfObjects.table);
    })
}

function saveHighscore(score) {
    // get nickname to save in highscore.json
    let nickname = Nickname.getName();

    // read the json file
    fs.readFile('./data/highscore.json', 'utf-8', function (err, data) {
        if (err) throw err;

        let arrayOfObjects = JSON.parse(data);
        arrayOfObjects.table.push({
            name: nickname,
            score: score
        })

        // write highscore to json file
        fs.writeFile('./data/highscore.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', function (err) {
            if (err) throw err;
            console.log('Saving highscores!');
        })
    })
}

module.exports = {
    getHighscore: getHighscore,
    saveHighscore: saveHighscore
};