import mongoose from "mongoose";

const comentriesSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Types.ObjectId, ref: "Products", require: true },
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

export default mongoose.model("Comentries", comentriesSchema);
