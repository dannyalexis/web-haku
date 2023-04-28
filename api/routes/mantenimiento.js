import express from "express";
import auth from "../middlewares/auth.js";
const router = express.Router();
import {
  createMantenimiento,
  getMantenimientos,
  getMantenimiento,
  updateMantenimiento,
  deleteMantenimiento,
  getMantenimientoUser,
} from "../controllers/mantenimiento.js";

router.post("/register", auth, createMantenimiento);
router.get("/", auth, getMantenimientos);
router.get("/:id", auth, getMantenimiento);
router.put("/:id", auth, updateMantenimiento);
router.delete("/:id", auth, deleteMantenimiento);
/*usuario */

router.get("/user/mantenimiento", auth, getMantenimientoUser);

export default router;
