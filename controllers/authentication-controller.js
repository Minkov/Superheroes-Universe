/* globals module */

module.exports = function({ data }) {
    return {
        name: "authentication",
        signUp(req, res) {
            let { username, password } = req.body;
            data.createUser(username, password)
                .then(user => {
                    return res.redirect("/auth/sign-in");
                });
        },
        signOut(req, res) {
            req.logout();
            res.redirect("/");
        },
        getSignUpForm(req, res) {
            return res.render("authentication/sign-up");
        },
        getSignInForm(req, res) {
            return res.render("authentication/sign-in");
        }
    };
};