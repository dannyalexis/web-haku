import express from "express";
import { login, register } from "../controllers/auth.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", auth, register);

export default router;
