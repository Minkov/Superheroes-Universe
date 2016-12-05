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
                    superhero.isInFavorites = false;
                    if (req.user) {
                        let superheroInFavorites = req.user.superheroes.find(sh => sh.name === superhero.name);
                        superhero.isInFavorites = typeof superheroInFavorites !== "undefined";
                    }
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
            return Promise.all([data.getPowers(), data.getFractions()])
                .then(([powers, fractions]) => {
                    return res.render("superheroes/create", {
                        user: req.user,
                        model: {
                            powers,
                            fractions
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
        addToFavorites(req, res) {
            if (!req.isAuthenticated()) {
                return res.send("User must be authenticated!");
            }
            let user = req.user;
            let id = req.body.superheroId;
            return data.addSuperheroToFavorites(id, user)
                .then(() => {
                    // return res.send({ result: true });
                    return res.redirect(`/superheroes/${id}`);
                })
                .catch(err => {
                    return res.send(err);
                });
        },
        removeFromFavorites(req, res) {
            if (!req.isAuthenticated()) {
                return res.send("User must be authenticated");
            }

            let user = req.user;
            let id = req.body.superheroId;

            return data.removeSuperheroFromFavorites(id, user)
                .then(() => {
                    return res.redirect(`/superheroes/${id}`);
                })
                .catch(err => {
                    return res.send(err);
                });
        },
        updateSuperhero(req, res) {

        }
    };
};