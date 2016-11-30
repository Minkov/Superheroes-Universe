/* globals module require */

const express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    session = require("express-session");

module.exports = function({ data }) {
    let app = express();

    app.set("view engine", "pug");

    app.use("/static", express.static("public"));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({
        secret: "purple unicorn",
        resave: true,
        saveUninitialized: true
    }));
    require("./passport")({ app, data });
    return app;
};