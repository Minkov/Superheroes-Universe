/* globals module */

const DEFAULT_PROFILE_IMAGE_PATH = "public/imgs/profile-images/default-profile-image.jpg";

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
                        const imagePath = user.imagePath || DEFAULT_PROFILE_IMAGE_PATH;
                        user.imagePath = imagePath.replace("public", "static");

                        return res.render("users/details", {
                            model: user,
                            user: req.user
                        });
                    });
            }

            let user = req.user;
            console.log(user.imagePath);
            const imagePath = user.imagePath || DEFAULT_PROFILE_IMAGE_PATH;
            user.imagePath = imagePath.replace("public", "static");

            return res.render("users/profile", {
                model: user,
                user: req.user
            });
        },
        getEditProfile(req, res) {
            if (!req.isAuthenticated()) {
                return res.status(401)
                    .redirect("/users");
            }

            return res.render("users/edit", {
                model: req.user,
                user: req.user
            });
        },
        updateProfile(req, res) {
            if (!req.isAuthenticated()) {
                return res.redirect("/");
            }

            const imagePath = req.file.path;
            console.log(imagePath);
            return data.updateUser(req.user, imagePath)
                .then(() => {
                    return res.redirect(`/users/${req.user.username}`);
                });
        }
    };
};