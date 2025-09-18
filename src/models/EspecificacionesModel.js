import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "Especificaciones";

const Especificaciones = new mongoose.Schema({
  Color: "String",
  CodColor: "String",
  Talle: "String",
  Stock: "Number",
  CodProducto: "String",
  _IdProduct: { type: "String" },
  Estado: { type: "String", enum: ["Alta", "Baja"], default: "Alta" },
  
},
  {
    timestamps: true,
  }
);

export default mongoose.model(collection, Especificaciones);
