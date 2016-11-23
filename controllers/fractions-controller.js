/* globals module */

module.exports = function(data) {
    return {
        getFractions(req, res) {
            data.getFractions()
                .then(fractions => {
                    res.render("fractions-list", {
                        model: fractions,
                        user: { username: "Doncho" }
                    });
                });
        },
        getFractionDetails(req, res) {


        },
        createFraction(req, res) {


        }
    };
};