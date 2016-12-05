/* globals module require */

const express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

module.exports = function({ data }) {
    let app = express();
    app.set("view engine", "pug");

    app.use("/static", express.static("public"));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({
        secret: "purple unicorn",
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        resave: true,
        saveUninitialized: true,
        session: { maxAge: 1000 * 60 * 60 }
    }));
    require("./passport")({ app, data });

    let server = require("http").Server(app);
    return { app, server };
};