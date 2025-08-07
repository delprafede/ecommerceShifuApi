import mongoose from "mongoose";

const contactoUsers = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nameUser: {
      type: String,
    },
    emial: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ContactoUser", contactoUsers);
