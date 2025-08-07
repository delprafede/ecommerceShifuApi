import mongoose from "mongoose";
import ProductsModels from "../models/ProductModel.js";
mongoose.pluralize(null);

const collection = "Favorites";

const favSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Products", require: true },
    user: { type: mongoose.Types.ObjectId, ref: "Users", require: true },
    agregado: {type: Boolean, default: false, require: true},
  },
  {
    timestamps: true,
  }
);

favSchema.pre("find", function () {
  this.populate({ path: "product", model: ProductsModels });
});

export default mongoose.model(collection, favSchema);
