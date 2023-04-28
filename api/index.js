import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import placaRoute from "./routes/placa.js";
import combustibleRoute from "./routes/combustible.js";
import mantenimientoRoute from "./routes/mantenimiento.js";
import bitacoraRoute from "./routes/bitacora.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use(express.json());
//middlewares

app.use("/api/auth", authRoute);
app.use("/api/placa", placaRoute);
app.use("/api/auth", userRoute);
app.use("/api/combustible", combustibleRoute);
app.use("/api/mantenimiento", mantenimientoRoute);
app.use("/api/bitacora", bitacoraRoute);

app.listen(8000, () => {
  connect();
  console.log("Connected to backend.");
});
