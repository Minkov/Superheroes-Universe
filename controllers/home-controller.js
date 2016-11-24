/* globals module */

module.exports = function(data) {
    return {
        home(req, res) {
            return res.render("home/home", {
                user: req.user
            });
        }
    };
};