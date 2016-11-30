/* module require __dirname */

const fs = require("fs"),
    path = require("path");

module.exports = function(params) {
    let controllers = {};
    fs.readdirSync(__dirname)
        .filter(file => file.includes("-controller"))
        .forEach(file => {
            let modulePath = path.join(__dirname, file);
            let theModule = require(modulePath)(params);
            controllers[theModule.name] = theModule;
        });
    return controllers;
};