/* globals require module*/

const mongoose = require("mongoose");

let Schema = mongoose.Schema;

module.exports.register = function(name, schemaProperties) {
    let schema = new Schema(schemaProperties);
    mongoose.model(name, schema);
    return mongoose.model(name);
};