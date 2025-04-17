import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = Router();

// POST /api/auth/
router.post("/register", registerUser);

// POST /api/auth/
router.post("/login", loginUser);

export default router;
