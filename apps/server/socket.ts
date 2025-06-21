// socket.ts
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let io: IOServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export const initSocketServer = (httpServer: HTTPServer) => {
    io = new IOServer(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("🧠 New client connected:", socket.id);

        socket.on("update_note", ({ noteId, content }) => {
            // Broadcast to other clients
            console.log(`📝 Note updated in room ${noteId}:`, content);
            socket.broadcast.to(noteId).emit("receive_update", content);
        });

        socket.on("join_room", (noteId) => {
            socket.join(noteId);
        });

        socket.on("disconnect", () => {
            console.log("🚪 Client disconnected:", socket.id);
        });
    });
};

export const getIO = () => io;
