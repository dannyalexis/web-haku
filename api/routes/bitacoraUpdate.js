import express from "express";
import auth from "../middlewares/auth.js";
const router = express.Router();
import { getBitacoraUpdateUser } from "../controllers/bitacoraUpdate.js";

/*busqueda por usuario */

router.get("/user/btup", auth, getBitacoraUpdateUser);

export default router;
