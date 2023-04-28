import express from "express";
import {
  createPlaca,
  getPlaca,
  getPlacas,
  updatePlaca,
  deletePlaca,
  getPlacaOficina,
} from "../controllers/placa.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.get("/", auth, getPlacas);
router.get("/:id", auth, getPlaca);
router.post("/register", auth, createPlaca);
router.put("/:id", auth, updatePlaca);
router.delete("/:id", auth, deletePlaca);
router.get("/user/oficina", auth, getPlacaOficina);

export default router;
