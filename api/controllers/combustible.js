import Combustible from "../models/Combustible.js";

export const createCombustible = async (req, res) => {
  try {
    const {
      placa,
      cantidadGalones,
      costo,
      fecha,
      proveedor,
      observaciones,
      nValeFactura,
      tipoCombustible,
      km,
    } = req.body;
    const combustible = new Combustible();
    combustible.user = req.datos.userId;
    combustible.placa = placa;
    combustible.oficina = req.datos.oficina;
    combustible.cantidadGalones = cantidadGalones;
    combustible.costo = costo;
    combustible.fecha = fecha;
    combustible.proveedor = proveedor;
    combustible.observaciones = observaciones;
    combustible.nValeFactura = nValeFactura;
    combustible.tipoCombustible = tipoCombustible;
    combustible.km = km;
    await combustible.save();
    res.status(200).send("Combustible registrada");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const getCombustibles = async (req, res) => {
  try {
    const com = await Combustible.find();
    res.status(200).json(com);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const getCombustible = async (req, res) => {
  try {
    const combustible = await Combustible.findById(req.params.id);
    res.status(200).json(combustible);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const updateCombustible = async (req, res) => {
  try {
    const updateCombustible = await Combustible.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateCombustible);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const deleteCombustible = async (req, res) => {
  try {
    await Combustible.findByIdAndDelete(req.params.id);
    res.status(200).json("Combustible eliminado");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const getCombustibleUser = async (req, res) => {
  try {
    const com = await Combustible.find({ user: req.datos.userId });
    res.json(com);
  } catch {
    console.log(error);
    res.sendStatus(500);
  }
};
