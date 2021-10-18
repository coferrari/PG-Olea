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

io.on("connection", (socket) => {
    let name;
  console.log(`user connected: ${socket.id}`);
  socket.on("connected", (username) => {
      name = username
    socket.broadcast.emit("messages", {
      username,
      message: `${username} se unió al chat`,
    });
  });
  socket.on("message", (data) => {
    io.emit("messages", data);
  });

  socket.on("disconnect", () => {
    io.emit("messages", {
      app: "Servidor",
      message: `${name} ha abandonado el chat`,
    });
  });
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
