/* globals module require Promise */

const dataUtils = require("./utils/data-utils"),
    mapper = require("../utils/mapper"),
    fs = require("fs");

module.exports = function(models) {
    let {
        User
    } = models;

    return {
        createUser(username, password) {
            let user = new User({ username, password });
            return new Promise((resolve, reject) => {
                user.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        updateUser(user, imagePath) {
            try {
                if (user.imagePath) {
                    fs.unlinkSync(user.imagePath);
                }
            } catch (ex) {
                console.log(ex);
            }

            user.imagePath = imagePath;
            return dataUtils.save(user);
        },
        getUserByUsername(username) {
            return dataUtils.getByQuery(User, { username });
        },
        getAllUsers() {
            return dataUtils.getAll(User);
        }
    };
};