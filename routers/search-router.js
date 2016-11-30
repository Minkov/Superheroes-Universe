/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let controller = controllers.search;
    let router = new Router();

    router
        .get("/", controller.search);

    app.use("/search", router);

    return router;
};