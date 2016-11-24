/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, data }) {
    let controller = require("../controllers/search-controller")(data);

    let router = new Router();

    router
        .get("/", controller.search);

    app.use("/search", router);

    return router;
};