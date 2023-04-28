import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CombustibleSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    placa: {
      type: String,
      ref: "Placa",
      required: true,
    },
    oficina: {
      type: String,
      required: true,
    },
    cantidadGalones: {
      type: String,
      required: true,
    },
    costo: {
      type: Number,
      required: true,
    },
    fecha: {
      type: Date,
    },
    proveedor: {
      type: String,
    },
    observaciones: {
      type: String,
    },
    nValeFactura: {
      type: String,
    },
    tipoCombustible: {
      type: String,
    },
    km: {
      type: Number,
    },
    estado: {
      type: String,
      default: "A",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Combustible", CombustibleSchema);
