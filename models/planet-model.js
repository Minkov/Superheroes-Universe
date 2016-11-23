/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Planet", {
    name: {
        type: String,
        required: true,
        unique: true
    },
    coutries: [{}]
});