import { Router } from "express";
import {
  listRooms,
  getRoomMessages,
  getUserMessages,
  createRoom,
} from "../controllers/chatController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// GET /api/chat/
// Protected: list all rooms
router.get("/rooms", authMiddleware, listRooms);

// POSt create a new room
router.post("/rooms", authMiddleware, createRoom);

// GET /api/chat/
// Protected: get history for one room
router.get("/rooms/:id/messages", authMiddleware, getRoomMessages);

// GET /api/chat/
// Protected: only logged‑in users can fetch 1‑to‑1 DMs
router.get("/users/:userId/messages", authMiddleware, getUserMessages);

export default router;
