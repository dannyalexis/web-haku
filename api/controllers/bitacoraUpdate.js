import BitacoraUpdate from "../models/BitacoraUpdate.js";

export const getBitacoraUpdateUser = async (req, res) => {
  try {
    const bitacoraUpdate = await BitacoraUpdate.find({
      user: req.datos.userId,
    });
    res.json(bitacoraUpdate);
  } catch {
    console.log(error);
    res.sendStatus(500);
  }
};
