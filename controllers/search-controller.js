/* globals module */

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 10;

module.exports = function({ data }) {
    return {
        name: "search",
        search(req, res) {
            let pattern = req.query.pattern || "";
            let page = Number(req.query.page || DEFAULT_PAGE);

            return Promise.all([data.searchSuperheroes(({ pattern, page, pageSize: PAGE_SIZE })), data.searchFractions({ pattern, page, pageSize: PAGE_SIZE })])
                .then(([superheroes, fractions]) => {
                    return res.render("search/search", {
                        model: {
                            superheroes,
                            fractions
                        },
                        params: { pattern },
                        user: req.user
                    });
                });

        }
    };
};