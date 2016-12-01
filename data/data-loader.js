/* globals require module __dirname global */

const mongoose = require("mongoose");

const fs = require("fs"),
    path = require("path");

// mongoose.Promise = global.Promise;

module.exports = function(connectionString) {
    mongoose.connect(connectionString);
    mongoose.Promise = global.Promise;

    let City = require("../models/city-model.js");
    let Country = require("../models/country-model.js");
    let Fraction = require("../models/fraction-model.js");
    let Planet = require("../models/planet-model.js");
    let Power = require("../models/power-model.js");
    let Superhero = require("../models/superhero-model.js");
    let User = require("../models/user-model.js");

    let models = { City, Country, Fraction, Planet, Power, Superhero, User };

    let data = {};

    fs.readdirSync(__dirname)
        .filter(file => file.includes("-data"))
        .forEach(file => {
            let modulePath = path.join(__dirname, file);
            let dataModule = require(modulePath)(models);
            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });
    return data;
};