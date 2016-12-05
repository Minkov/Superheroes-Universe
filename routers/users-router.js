/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers, upload }) {
    let controller = controllers.users;

    let router = new Router();

    router
        .get("/edit", controller.getEditProfile)
        .post("/edit", upload.single("profile-image"), controller.updateProfile)
        .get("/:username", controller.getUserByUsername)
        .get("/", controller.getAllUsers);

    app.use("/users", router);

    return router;
};