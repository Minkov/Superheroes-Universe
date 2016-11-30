/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let controller = controllers.fractions;

    let router = new Router();

    router
        .get("/", controller.getFractions)
        .get("/:id", controller.getFractionDetails)
        .post("/", controller.createFraction);

    app.use("/fractions", router);

    return router;
};