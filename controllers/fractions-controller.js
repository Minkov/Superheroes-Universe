/* globals module */

module.exports = function({ data }) {
    return {
        name: "fractions",
        getFractions(req, res) {
            return data.getFractions()
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
                    if (!fraction) {
                        // return res.redirect("/fractions");
                        return res.status(404)
                            .render("fractions/details", {
                                model: null,
                                user: req.user
                            });
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