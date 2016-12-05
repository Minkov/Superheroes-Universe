/* globals module require */

const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportSocketIo = require("passport.socketio");
const sessionStore = require("sessionstore");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

module.exports = function({ server, data }) {
    let io = require("socket.io")(server);

    io.use(passportSocketIo.authorize({
        key: "connect.sid",
        secret: "purple unicorn",
        passport,
        cookieParser,
        store: new RedisStore()
    }));

    io.on("connection", socket => {
        // socket.emit("conn", "To the client");
        // socket.on("conn", data1 => {
        // console.log(data1);
        // socket.emit("conn", { text: "It works!" });
        // });
        console.log(socket.request.user);
    });

    return io;
};