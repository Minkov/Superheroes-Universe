// /* globals require console*/
const config = require("./config");

let data = require("./data")(config.connectionString);

const { server, app } = require("./config/application")({ data });
const upload = require("./config/upload")();

server.listen(config.port, () => console.log(`Superheroes running at :${config.port}`));

// let io = require("./config/sockets")({ server, data });
let controllers = require("./controllers")({
    data
    // , io
});

require("./routers")({ app, data, controllers, upload });