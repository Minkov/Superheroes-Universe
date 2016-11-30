/* globals module */

module.exports = function(data) {
    return {
        getFractions(req, res) {
            data.getFractions()
                .then(fractions => {
                    res.render("fractions/list", {
                        model: fractions,
                        user: req.user
                    });
                });
        },
        getFractionDetails(req, res) {
            return data.getFractionById(req.params.id)
                .then(fraction => {
                    if (fraction === null) {
                        return res.status(404)
                            .redirect("/fractions");
                    }

                    return res.render("fractions/details", {
                        model: fraction,
                        user: req.user
                    });
                });
        },
        createFraction(req, res) {

        }
    };
};