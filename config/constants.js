/* globals module */
module.exports = {
    connectionString: {
        dev: "mongodb://localhost/superheroesUniverseDb",
        prod: "mongodb://Admin:123456q@ds159747.mlab.com:59747/superheroes-universe"
    },
    port: process.env.PORT || 3001
};