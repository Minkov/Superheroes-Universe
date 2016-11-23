/* globals module */

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 10;

module.exports = function(data) {
    const controller = {
        getSuperheroes(req, res) {
            let user = req.user;
            let pattern = req.query.pattern || "";
            let page = Number(req.query.page || DEFAULT_PAGE);

            data.getSuperheroes({ pattern, page, pageSize: 3 })
                .then((superheroes => {
                    return res.render("superheroes-list", {
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
                    let user = { username: "Doncho" };
                    return res.render("superhero-details", {
                        model: superhero,
                        user
                    });
                });
        },
        createSuperhero(req, res) {

        },
        updateSuperhero(req, res) {

        }
    };
    return controller;
};