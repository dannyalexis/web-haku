import Bitacora from "../models/Bitacora.js";
import BitacoraUpdate from "../models/BitacoraUpdate.js";

export const getBitacoraUser = async (req, res) => {
  try {
    const bitacora = await Bitacora.find({ user: req.datos.userId });
    res.json(bitacora);
  } catch {
    console.log(error);
    res.sendStatus(500);
  }
};
export const getBitacora = async (req, res) => {
  try {
    const bitacora = await Bitacora.findById(req.params.id);
    res.status(200).json(bitacora);
  } catch {
    console.log(error);
    res.sendStatus(500);
  }
};

export const createBitacora = async (req, res) => {
  try {
    const {
      placa,
      kmInicial,
      kmFinal,
      LugarOrigen,
      LugarLlegada,
      fecha,
      horaOrigen,
      horaLlegada,
      proyecto,
      pasajeros,
      proposito,
    } = req.body;
    const bitacora = new Bitacora();
    bitacora.user = req.datos.userId;
    bitacora.placa = placa;
    bitacora.oficina = req.datos.oficina;
    bitacora.kmInicial = kmInicial;
    bitacora.kmFinal = kmFinal;
    bitacora.kmRecorrido = kmFinal - kmInicial;
    bitacora.LugarOrigen = LugarOrigen;
    bitacora.LugarLlegada = LugarLlegada;
    bitacora.fecha = fecha;
    bitacora.horaOrigen = horaOrigen;
    bitacora.horaLlegada = horaLlegada;
    bitacora.proyecto = proyecto;
    bitacora.pasajeros = pasajeros;
    bitacora.proposito = proposito;
    if (kmInicial >= kmFinal) {
      res.status(401).send("EL KM inicial no puede ser mayor al KM final");
    } else {
      await BitacoraUpdate.findOneAndUpdate(
        placa,
        {
          kilometraje: kmFinal,
          lugar: LugarLlegada,
          proyecto: proyecto,
          proposito: proposito,
          hora: horaLlegada,
        },
        { new: true }
      );
      await bitacora.save();
      res.status(200).send("Bitacora registrada");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const deleteBitacora = async (req, res) => {
  try {
    await Bitacora.findByIdAndDelete(req.params.id);
    res.status(200).json("Bitacora eliminado");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const peticionBitacora = async (req, res) => {
  const { placa } = req.params;
  try {
    const result = await BitacoraUpdate.findOne({ placa: placa });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
export const updateBitacora = async (req, res) => {
  try {
    const bitacora = await Bitacora.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(bitacora);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
