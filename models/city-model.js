/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("City", {
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {},
    planet: {}
});