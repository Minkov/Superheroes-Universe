/* globals module require*/

const multer = require("multer");
const Imagemin = require('image-min');

module.exports = function() {
    let upload = multer({
        dest: "public/imgs/profile-images"
    });
    return upload;
};