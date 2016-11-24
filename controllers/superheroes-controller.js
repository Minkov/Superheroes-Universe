/* globals module */

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 10;

module.exports = function(data) {
    const controller = {
        getSuperheroes(req, res) {
            let user = req.user;
            let pattern = req.query.pattern || "";
            let page = Number(req.query.page || DEFAULT_PAGE);

            data.getSuperheroes({ pattern, page, pageSize: PAGE_SIZE })
                .then((superheroes => {
                    return res.render("superheroes/list", {
                        model: superheroes,
                        user,
                        params: { pattern, page }
                    });
                }))
                .catch(err => {
                    res.status(404)
                        .send(err);
                });
        },
        getSuperheroDetails(req, res) {
            let id = req.params.id;
            data.getSuperheroById(id)
                .then(superhero => {
                    return res.render("superheroes/details", {
                        model: superhero,
                        user: req.user
                    });
                });
        },
        getCreateSuperheroForm(req, res) {
            // if (!req.isAuthenticated()) {
            //     return res.redirect("/");
            // }

            return res.render("superheroes/create", {
                user: req.user
            });
        },
        createSuperhero(req, res) {
            // if (!req.isAuthenticated()) {
            //     return res.redirect("/");
            // }

            let {
                name,
                secretIdentity,
                powers,
                city,
                country,
                planet,
                story,
                alignment,
                imageUrl,
                fractions
            } = req.body;
            if (!Array.isArray(fractions)) {
                fractions = [fractions];
            }

            return data.createSuperhero(
                    name,
                    secretIdentity,
                    powers,
                    city,
                    country,
                    planet,
                    story,
                    alignment,
                    imageUrl,
                    fractions)
                .then(superhero => {
                    return res.redirect(`/superheroes/${superhero.id}`);
                })
                .catch(err => {
                    res.status(400)
                        .send(err);
                });
        },
        updateSuperhero(req, res) {

        }
    };
    return controller;
};