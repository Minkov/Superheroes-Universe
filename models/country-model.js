/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("County", {
    name: {
        type: String,
        required: true,
        unique: true
    },
    cities: [{}],
    planet: {}
});