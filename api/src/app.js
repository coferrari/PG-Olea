const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
const errorHandler = require("./utils/middlewares/errorHandler");
const setHeaders = require("./utils/middlewares/setHeaders");
require("./db.js");

const server = express();

const http = require("http");
const app = http.createServer(server);
const io = require('socket.io')(app, {
    cors: {
      origin: '*',
    }
  });

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    console.log('new client connected');
    socket.on('connected', () => {
        console.log('user connected')
    });
    socket.on("message", (message) => {
        io.emit("messages", {message})
    })
    socket.on('disconnect', () => {
        io.emit('messages', {app: "Servidor", message: "ha abandonado el chat"})
    })
});

server.name = "API";

server.use(cookieParser());
server.use(morgan("dev"));
server.use(setHeaders);
server.use(cors());
server.use("/api", routes);

// Error catching endware.
server.use(errorHandler);

module.exports = app;
