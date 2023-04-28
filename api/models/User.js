import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    oficina: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    tipo: { type: String }, // A:admin | C:conductor
    img: {
      type: String,
    },
    country: {
      type: String,
    },
    estado: {
      type: String,
      default: "A",
    },
  },
  { versionKey: false },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
