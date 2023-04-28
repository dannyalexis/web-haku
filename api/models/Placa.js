import mongoose from "mongoose";

const PlacaSchema = new mongoose.Schema(
  {
    placa: {
      type: String,
      unique: true,
      required: true,
    },
    oficina: {
      type: String,
      required: true,
    },
    tipovehiculo: {
      type: String,
      required: true,
    },
    km: {
      type: Number,
      required: true,
    },
    tipocombustible: {
      type: String,
      required: true,
    },
    marca: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    estado: {
      type: String,
      default: "A",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Placa", PlacaSchema);
