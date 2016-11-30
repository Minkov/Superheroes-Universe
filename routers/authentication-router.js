/* globals module require */

const express = require("express");
const passport = require("passport");

let Router = express.Router;

module.exports = function({ app, controllers }) {
    let controller = controllers.authentication;
    let router = new Router();

    router
        .get("/sign-up", controller.getSignUpForm)
        .get("/sign-in", controller.getSignInForm)
        .post("/sign-up", controller.signUp)
        .post("/sign-in",
            passport.authenticate("local", { failureRedirect: "/auth/sign-in" }),
            (req, res) => res.redirect("/"))
        .post("/sign-out", controller.signOut);

    app.use("/auth", router);

    return router;
};