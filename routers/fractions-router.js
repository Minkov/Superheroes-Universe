/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, data }) {

    let controller = require("../controllers/fractions-controller")(data);

    let router = new Router();

    router
        .get("/", controller.getFractions)
        .get("/:id", controller.getFractionDetails)
        .post("/", controller.createFraction);

    app.use("/fractions", router);

    return router;
};