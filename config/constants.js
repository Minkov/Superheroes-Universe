/* globals module */
module.exports = {
    connectionString: "mongodb://localhost/superheroesUniverseDb",
    port: process.env.PORT || 3001,
    env: process.env["heroku"] || "development"
};