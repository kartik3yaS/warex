let io;

const initWebSocket = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-admin-room", (data) => {
      if (data.role === "admin") {
        socket.join("admin-room");
        console.log(`Admin ${socket.id} joined admin room`);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

const emitOrderNotification = (data) => {
  if (io) {
    io.to("admin-room").emit("new-order", data);
  }
};

module.exports = { initWebSocket, emitOrderNotification };
