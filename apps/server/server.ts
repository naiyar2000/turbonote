import http from "http"
import app from "./app";
import { initSocketServer } from "./socket";

const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// ✅ Combine Express with HTTP Server
const server = http.createServer(app);

// ✅ Init socket.io with shared server
initSocketServer(server);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
