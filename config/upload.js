/* globals module require*/

const multer = require("multer");
const Imagemin = require('image-min');

module.exports = function() {
    let upload = multer({
        dest: "public/imgs/profile-images",
        onFileUploadComplete(file) {
            let imagemin = new Imagemin().src(file.path).use("jpg");
            imagemin.run(function(err, files) {
                if (err) {
                    return next(err);
                }
                console.log('Files optimized successfully!');
            });
            console.log(file.fieldname + ' uploaded to  ' + file.path);
        }
    });
    return upload;
};