import express from "express";
import {
  getUsers,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/user.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

//UPDATE
router.put("/:id", auth, updateUser);

//DELETE
router.delete("/:id", auth, deleteUser);

//GET
router.get("/:id", auth, getUser);

//GET ALL
router.get("/", auth, getUsers);

export default router;
