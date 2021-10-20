const socketEvents = (io) => {
  io.on("connection", (socket) => {
    let name;
    console.log(`user connected: ${socket.id}`);
    socket.on("connected", (username) => {
      name = username;
      socket.broadcast.emit("messages", {
        username,
        msg: `${username} se unió al chat`,
      });
    });
    socket.on("message", (data) => {
      io.emit("messages", data);
    });

    socket.on("disconnect", () => {
      if (name) {
        io.emit("messages", {
          app: "Servidor",
          msg: `${name} ha abandonado el chat`,
        });
      }
    });
  });
};

module.exports = socketEvents;
