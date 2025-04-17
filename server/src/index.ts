import express from "express";
import http from "http";
import { Server as IOServer } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./sockets/types";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import chatRouter from "./routes/chatRoutes";

import { initializeSockets } from "./sockets";

dotenv.config();
const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3000", // allow request from frontend
    credentials: true, // Allow cookies/auth ehaders
  })
);

const server = http.createServer(app);
const io = new IOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

initializeSockets(io);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Initial API Routing
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
