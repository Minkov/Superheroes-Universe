/* globals module require */

const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

module.exports = function({ app, data }) {
    app.use(passport.initialize());
    app.use(passport.session());

    const strategy = new LocalStrategy((username, password, done) => {
        data.findUserByCredentials(username, password)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(error => done(error, null));
    });

    passport.use(strategy);

    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser((id, done) => {
        // use the id serialized in the session to retrieve the use from the database
        data.findUserById(id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(error => done(error, false));
    });
};