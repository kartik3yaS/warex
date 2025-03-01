const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { initWebSocket } = require("./services/websocket");
const { initCronJobs } = require("./services/cronService");

connectDB();

const server = http.createServer(app);

const io = initWebSocket(server);

initCronJobs(io);

// server start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
