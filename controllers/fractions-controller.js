/* globals module */

module.exports = function(data) {
    return {
        getFractions(req, res) {
            data.getFractions()
                .then(fractions => {
                    res.render("fractions-list", {
                        model: fractions,
                        user: req.user
                    });
                });
        },
        getFractionDetails(req, res) {

        },
        createFraction(req, res) {


        }
    };
};