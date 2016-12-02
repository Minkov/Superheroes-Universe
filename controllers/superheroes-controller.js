/* globals module */

const mapper = require("../utils/mapper");

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 10,
    NEWEST_SUPERHEROES_COUNT = 5;

module.exports = function({ data, io }) {
    return {
        name: "superheroes",
        getNewestSuperheroesAjax(req, res) {
            data.getNewestSuperheroes(NEWEST_SUPERHEROES_COUNT)
                .then(superheroes => {
                    res.send({
                        result: superheroes.map(superhero => mapper.map(superhero, "_id", "name", "imageUrl"))
                    });
                });
        },
        getSuperheroes(req, res) {
            let user = req.user;
            let pattern = req.query.pattern || "";
            let page = Number(req.query.page || DEFAULT_PAGE);

            if (req.user) {
                console.log(req.user);
                console.log(io.sockets.connected);
            }

            data.getSuperheroes({ pattern, page, pageSize: PAGE_SIZE })
                .then((result => {
                    let {
                        superheroes,
                        count
                    } = result;

                    if (count === 0) {
                        return res.render("superheroes/list", {
                            model: superheroes,
                            user,
                            params: { pattern, page, pages: 0 }
                        });
                    }

                    if (page < 1) {
                        return res.redirect("/superheroes?page=1");
                    }

                    let pages = count / PAGE_SIZE;
                    if (parseInt(pages, 10) < pages) {
                        pages += 1;
                        pages = parseInt(pages, 10);
                    }
                    if (page > pages) {
                        page = pages;
                        return res.redirect(`/superheroes?page=${page}`);
                    }

                    return res.render("superheroes/list", {
                        model: superheroes,
                        user,
                        params: { pattern, page, pages }
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
            if (!req.isAuthenticated()) {
                return res.redirect("/");
            }
            return data.getPowers()
                .then(powers => {
                    return res.render("superheroes/create", {
                        user: req.user,
                        model: {
                            powers
                        }
                    });
                });
        },
        createSuperhero(req, res) {
            let { name, secretIdentity, powers, city, country, planet, story, alignment, imageUrl, fractions } = req.body;

            if (!Array.isArray(fractions)) {
                fractions = [fractions];
            }

            if (!Array.isArray(powers)) {
                powers = [powers];
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
                    fractions,
                    req.user)
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
};