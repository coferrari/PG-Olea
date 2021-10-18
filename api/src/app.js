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
server.name = "API";
const http = require("http").createServer(server);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//socket io
io.on("connection", (socket) => {
  console.log("connected.");
  socket.on("join", ({ name, room }) => {
    console.log(`se conecto  ${name} a la sala ${room}`);
  });
  server.on("disconnected", ({ name, room }) => {
    console.log(`disconnected ${name},${room}`);
  });
});

server.use(cookieParser());
server.use(morgan("dev"));
server.use(setHeaders);
server.use("/api", routes);

// Error catching endware.
server.use(errorHandler);

module.exports = http;
