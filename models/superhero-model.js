/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Superhero", {
    name: {
        type: String,
        required: true
    },
    secretIdentity: {
        type: String,
        required: true
    },
    alignment: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    fractions: [{}],
    powers: [{}],
    city: {},
    country: {},
    planet: {},
    user: {}
});