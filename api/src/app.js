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
server.use(cors());
server.use(express.json());
const http = require("http");
const app = http.createServer(server);
const io = require("socket.io")(app, {
  cors: {
    origin: "*",
  },
});
const socketEvents = require('./socket/socket');
socketEvents(io);

server.name = "API";

server.use(cookieParser());
server.use(morgan("dev"));
server.use(setHeaders);
server.use(cors());
server.use("/api", routes);

// Error catching endware.
server.use(errorHandler);

module.exports = app;
