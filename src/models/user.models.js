import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "Users";

const userSchema = new mongoose.Schema(
  {
    nameUser: { type: String, required: [true, "Es requerido el nombre"] },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "EL email es requerido"],
    },
    password: {
      type: String,
      required: [true, "El password es requerido"],
      minlength: 8,
    },
    rule: { type: String, default: "user" },
    // carrito: { type: mongoose.Types.ObjectId,
    // ref: "Shoppings" }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(collection, userSchema);
