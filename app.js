// /* globals require console*/
const config = require("./config");

let data = require("./data")(config.connectionString);

const app = require("./config/application")({ data });
let controllers = require("./controllers")({ data });

require("./routers")({ app, data, controllers });

app.listen(config.port, () => console.log(`Superheroes running at :${config.port}`));