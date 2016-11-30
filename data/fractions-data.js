/* globals module require Promise */

const dataUtils = require("./utils/data-utils"),
    mapper = require("../utils/mapper");

const MIN_PATTERN_LENGTH = 3;

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
        searchFractions({ pattern, page, pageSize }) {
            let query = {};
            if (typeof pattern === "string" && pattern.length >= MIN_PATTERN_LENGTH) {
                query.$or = [{
                    name: new RegExp(`.*${pattern}.*`, "gi")
                }];
            }

            let skip = (page - 1) * pageSize,
                limit = page * pageSize;

            return new Promise((resolve, reject) => {
                Fraction.find()
                    .where(query)
                    .skip(skip)
                    .limit(limit)
                    .exec((err, fractions) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(fractions || []);
                    });
            });
        },
        getFractionById(id) {
            return new Promise((resolve, reject) => {
                Fraction.findOne({ _id: id }, (err, fraction) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(fraction || null);
                });
            });
        },
        createFraction(name, alignment, cities, planets) {
            if (name.length < 3 || name.length > 40) {
                return Promise.reject({ reason: "Name must be between 3 and 40 characters long" });
            }

            let fraction = new Fraction({
                name,
                alignment,
                planets,
                cities
            });

            return new Promise((resolve, reject) => {
                fraction.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(fraction);
                });
            });
        }
    };
};