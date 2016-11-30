/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let controller = controllers.home;

    let router = new Router();

    router
        .get("/", controller.home);

    app.use("/", router);

    return router;
};