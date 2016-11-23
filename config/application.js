/* globals module require */

const express = require("express"),
    bodyParser = require("body-parser");

let app = express();

app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./passport")(app);

module.exports = app;