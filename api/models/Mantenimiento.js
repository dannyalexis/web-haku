import mongoose from "mongoose";
const Schema = mongoose.Schema;
const MantenimientoSchema = new mongoose.Schema(
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
    tipoMantenimiento: {
      type: String,
    },
    fecha: {
      type: Date,
    },
    km: {
      type: Number,
    },
    servicioRealizado: {
      type: String,
    },
    proveedor: {
      type: String,
    },
    dinero: {
      type: Number,
    },
    conformidad: {
      type: String,
    },
    observaciones: {
      type: String,
    },
    nValeFactura: {
      type: String,
    },
    estado: {
      type: String,
      default: "A",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mantenimiento", MantenimientoSchema);
