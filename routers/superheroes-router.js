/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let controller = controllers.superheroes;

    let router = new Router();

    router
        .get("/newest", controller.getNewestSuperheroesAjax)
        .get("/", controller.getSuperheroes)
        .get("/create", controller.getCreateSuperheroForm)
        .get("/:id", controller.getSuperheroDetails)
        .post("/", controller.createSuperhero)
        .post("/update", controller.updateSuperhero);

    app.use("/superheroes", router);

    return router;
};