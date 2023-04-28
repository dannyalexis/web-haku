import Mantenimiento from "../models/Mantenimiento.js";

export const getMantenimientos = async (req, res) => {
  try {
    const com = await Mantenimiento.find();
    res.status(200).json(com);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const getMantenimiento = async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findById(req.params.id);
    res.status(200).json(mantenimiento);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const createMantenimiento = async (req, res) => {
  try {
    const {
      placa,
      tipoMantenimiento,
      fecha,
      km,
      servicioRealizado,
      proveedor,
      dinero,
      conformidad,
      observaciones,
      nValeFactura,
    } = req.body;
    const mantenimiento = new Mantenimiento();
    mantenimiento.user = req.datos.userId;
    mantenimiento.oficina = req.datos.oficina;
    mantenimiento.placa = placa;
    mantenimiento.tipoMantenimiento = tipoMantenimiento;
    mantenimiento.fecha = fecha;
    mantenimiento.km = km;
    mantenimiento.servicioRealizado = servicioRealizado;
    mantenimiento.proveedor = proveedor;
    mantenimiento.dinero = dinero;
    mantenimiento.conformidad = conformidad;
    mantenimiento.observaciones = observaciones;
    mantenimiento.nValeFactura = nValeFactura;

    await mantenimiento.save();
    res.status(200).send("Mantenimiento registrada");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const getMantenimientoUser = async (req, res) => {
  try {
    const man = await Mantenimiento.find({ user: req.datos.userId });
    res.json(man);
  } catch {
    console.log(error);
    res.sendStatus(500);
  }
};
export const updateMantenimiento = async (req, res) => {
  try {
    const updateManteniimiento = await Mantenimiento.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateManteniimiento);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const deleteMantenimiento = async (req, res) => {
  try {
    await Mantenimiento.findByIdAndDelete(req.params.id);
    res.status(200).json("Mantenimiento eliminado");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
