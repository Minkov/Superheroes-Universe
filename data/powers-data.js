/* globals module require Promise */

const dataUtils = require("./utils/data-utils"),
    mapper = require("../utils/mapper");

module.exports = function(models) {
    let {
        Power
    } = models;

    return {
        getPowers() {
            return new Promise((resolve, reject) => {
                Power.find()
                    .exec((err, powers) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(powers);
                    });
            });
        }
    };
};