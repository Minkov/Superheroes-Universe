/* globals module */

module.exports = function({ data }) {
    return {
        name: "users",
        getAllUsers(req, res) {
            if (!req.isAuthenticated()) {
                return res.status(401)
                    .redirect("/");
            }
            return data.getAllUsers()
                .then(users => {
                    res.render("users/list", {
                        model: users,
                        user: req.user
                    });
                });
        },
        getUserByUsername(req, res) {
            let username = req.params.username;
            if (!username) {
                return res.redirect("/users");
            }
            if (!req.user || username.toLowerCase() !== req.user.username.toLowerCase()) {
                return data.getUserByUsername(username)
                    .then(([user]) => {
                        return res.render("users/details", {
                            model: user,
                            user: req.user
                        });
                    });
            }

            return res.render("users/profile", {
                model: req.user,
                user: req.user
            });
        }
    };
};