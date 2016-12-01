/* globals module */

let connectionStrings = {
    production: process.env.CONNECTION_STRING,
    development: "mongodb://localhost/superheroesUniverseDb"
};

module.exports = {
    environment: process.env.NODE_ENV || "development",
    connectionString: {},
    port: process.env.PORT || 3001
};