/* globals module require Promise */

const dataUtils = require("./utils/data-utils"),
    mapper = require("../utils/mapper");

const MIN_PATTERN_LENGTH = 3;

module.exports = function(models) {
    let {
        User
    } = models;

    return {
        findUserByCredentials(username, password) {
            return new Promise((resolve, reject) => {
                User.findOne({ username, password }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    };
};