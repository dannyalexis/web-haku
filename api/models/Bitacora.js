import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BitacoraSchema = new mongoose.Schema(
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
    kmInicial: {
      type: Number,
    },
    kmFinal: {
      type: Number,
    },
    kmRecorrido: {
      type: Number,
    },
    LugarOrigen: {
      type: String,
    },
    LugarLlegada: {
      type: String,
    },
    fecha: {
      type: Date,
    },
    horaOrigen: {
      type: String,
    },
    horaLlegada: {
      type: String,
    },
    proyecto: {
      type: String,
    },
    pasajeros: {
      type: String,
    },
    proposito: {
      type: String,
    },
    estado: {
      type: String,
      default: "A",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bitacora", BitacoraSchema);
