/* globals module */

module.exports = function() {
    return {
        name: "home",
        home(req, res) {
            return res.render("home/home", {
                user: req.user
            });
        }
    };
};