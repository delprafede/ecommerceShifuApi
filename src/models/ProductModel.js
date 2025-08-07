import mongoose from "mongoose";
import Especificaciones from "./EspecificacionesModel.js";

mongoose.pluralize(null);

const collection = "Products";

const SchemaPoduct = new mongoose.Schema({
  IdProduct: { type: "String" },
  NombreProducto: { type: "String" },
  Precio: { type: "number" },
  UltimoPrecio: { type: "number", default: 0 },
  Detalle: { type: "String" },
  Categoria: { type: "String" },
  UrlImagen: [
    { public_id: { type: "string" }, secure_url: { type: "string" } },
  ], // es un array de strings;
  Especificaciones: {
    type: [{ id: mongoose.Schema.Types.ObjectId }],
    ref: "Especificaciones",
  },
});

SchemaPoduct.pre("findById", function () {
  this.populate({ path: "Especificaciones.id", model: Especificaciones });
});

SchemaPoduct.pre("findOne", function () {
  this.populate({ path: "Especificaciones.id", model: Especificaciones });
});

SchemaPoduct.pre("find", function () {
  this.populate({ path: "Especificaciones.id", model: Especificaciones });
});

export default mongoose.model(collection, SchemaPoduct);
