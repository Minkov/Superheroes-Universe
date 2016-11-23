/* globals require console*/
const config = require("./config");

const app = require("./config/application");

let data = require("./data")(config);

require("./routers")({ app, data });

app.listen(config.port, () => console.log(`Superheroes running at :${config.port}`));