/* globals require console*/
const config = require("./config");

let data = require("./data")(config.connectionString["prod"]);

const app = require("./config/application")({ data });

require("./routers")({ app, data });

app.listen(config.port, () => console.log(`Superheroes running at :${config.port}`));
