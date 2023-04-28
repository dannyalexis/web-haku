import express from "express";
import auth from "../middlewares/auth.js";
const router = express.Router();
import {
  getBitacoraUser,
  createBitacora,
  peticionBitacora,
  updateBitacora,
  deleteBitacora,
  getBitacora,
} from "../controllers/bitacora.js";

/*busqueda por usuario */
router.post("/register", auth, createBitacora);
router.get("/:id", auth, getBitacora);
router.put("/:id", auth, updateBitacora);
router.delete("/:id", auth, deleteBitacora);
router.get(
  "/user/bitacora",
  auth,
  getBitacoraUser
); /**listar toda mis bitacoras por usuario  */
router.get(
  "/user/:placa",
  auth,
  peticionBitacora
); /**buscar KM por placa en bitacoraupdate */

export default router;
