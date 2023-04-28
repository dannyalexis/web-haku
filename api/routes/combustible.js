import express from "express";
import auth from "../middlewares/auth.js";
const router = express.Router();
import {
  createCombustible,
  getCombustibles,
  getCombustibleUser,
  getCombustible,
  updateCombustible,
  deleteCombustible,
} from "../controllers/combustible.js";

router.post("/register", auth, createCombustible);
router.get("/", auth, getCombustibles);
router.get("/:id", auth, getCombustible);
router.put("/:id", auth, updateCombustible);
router.delete("/:id", auth, deleteCombustible);
/*busqueda por usuario */
router.get("/user/combustible", auth, getCombustibleUser);
export default router;
