/* globals module require Promise */

const dataUtils = require("./utils/data-utils"),
    mapper = require("../utils/mapper");

module.exports = function(models) {
    let {
        Fraction
    } = models;

    return {
        getFractions() {
            return new Promise((resolve, reject) => {
                Fraction.find((err, fractions) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(fractions);
                });
            });
        },
        getFractionById(id) {
            return new Promise((resolve, reject) => {
                Fraction.findOne({ _id: id }, (err, fraction) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(fraction);
                });
            });
        }
    };
};