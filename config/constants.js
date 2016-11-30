/* globals module */
module.exports = {
    environment: process.env.NODE_ENV || "development",
    connectionString: {
        production: "mongodb://Admin:123456q@ds159747.mlab.com:59747/superheroes-universe",
        development: "mongodb://localhost/superheroesUniverseDb"
    },
    port: process.env.PORT || 3001
};