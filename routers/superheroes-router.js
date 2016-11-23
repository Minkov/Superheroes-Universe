/* globals module require */

const express = require("express");
let Router = express.Router;



module.exports = function({ app, data }) {

    let controller = require("../controllers/superheroes-controller")(data);

    let router = new Router();

    router
        .get("/", controller.getSuperheroes)
        .get("/:id", controller.getSuperheroDetails)
        .post("/", controller.createSuperhero)
        .post("/update", controller.updateSuperhero);

    app.use("/superheroes", router);

    return router;
};