/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, data }) {
    let controller = require("../controllers/home-controller")(data);

    let router = new Router();

    router
        .get("/", controller.home);

    app.use("/", router);

    return router;
};