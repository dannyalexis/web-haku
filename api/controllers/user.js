import User from "../models/User.js";
import bcrypt from "bcryptjs";
//import { deleteImage } from "../libs/cloudinary.js";

export const getUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, oficina, email, password, phone, tipo, country } =
      req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const datos = {
      name,
      lastname,
      oficina,
      email,
      password: hash,
      phone,
      tipo,
      country,
    };

    const result = await User.findByIdAndUpdate(id, datos, { new: true });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Usuario eliminada");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
