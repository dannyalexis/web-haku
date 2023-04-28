import Placa from "../models/Placa.js";
import BitacoraUpdate from "../models/BitacoraUpdate.js";
export const getPlacas = async (req, res) => {
  try {
    const placa = await Placa.find();
    res.status(200).json(placa);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const createPlaca = async (req, res) => {
  try {
    const { placa, oficina, tipovehiculo, km, tipocombustible } = req.body;
    const placaExists = await Placa.findOne({ placa });
    if (placaExists) {
      res.status(401).send("La Placa ya fue registrado");
    } else {
      const newBitacora = new BitacoraUpdate();
      newBitacora.placa = placa;
      newBitacora.oficina = oficina;
      newBitacora.kilometraje = km;
      newBitacora.lugar = "Oficina";
      newBitacora.proyecto = "FEM";
      newBitacora.proposito = "Entregar vienes";
      newBitacora.hora = "14:06";
      newBitacora.tipoCombustible = tipocombustible;
      newBitacora.tipovehiculo = tipovehiculo;
      const newPlaca = new Placa(req.body);
      await newBitacora.save();
      const result = await newPlaca.save();
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getPlaca = async (req, res) => {
  try {
    const placa = await Placa.findById(req.params.id);
    res.status(200).json(placa);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const updatePlaca = async (req, res) => {
  try {
    const updatePlaca = await Placa.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatePlaca);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deletePlaca = async (req, res) => {
  try {
    await Placa.findByIdAndDelete(req.params.id);
    res.status(200).json("Placa eliminada");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
/**placa por oficina */

export const getPlacaOficina = async (req, res) => {
  try {
    const placa = await Placa.find({ oficina: req.datos.oficina });
    res.status(200).json(placa);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
