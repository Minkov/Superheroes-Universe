/* globals module require*/

const multer = require("multer");

module.exports = function() {
    let upload = multer({
        dest: "public/imgs/profile-images"
    });
    return upload;
};