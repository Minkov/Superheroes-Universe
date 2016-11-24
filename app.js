/* globals require console*/
const config = require("./config");


let envName = process.env["PRODUCTION"] ?
    "prod" :
    "dev";

envName = "prod";

let data = require("./data")(config.connectionString[envName]);

const app = require("./config/application")({ data });

require("./routers")({ app, data });

app.listen(config.port, () => console.log(`Superheroes running at :${config.port}`));