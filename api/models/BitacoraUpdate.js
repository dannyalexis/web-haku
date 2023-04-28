import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BitacoraUpdateSchema = new mongoose.Schema(
  {
    placa: {
      type: String,
      ref: "Placa",
      required: true,
    },
    oficina: {
      type: String,
      required: true,
    },
    kilometraje: {
      type: Number,
    },
    lugar: {
      type: String,
      required: true,
    },
    proyecto: {
      type: String,
    },
    proposito: {
      type: String,
    },
    hora: {
      type: String,
    },
    tipoCombustible: {
      type: String,
    },
    tipovehiculo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BitacoraUpdate", BitacoraUpdateSchema);
