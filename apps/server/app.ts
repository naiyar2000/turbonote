// server/app.ts
import express from "express";
import cors from "cors";
import noteRoutes from "./routes/note.routes";
import authRoutes from "./routes/auth.routes";


const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);


export default app;
