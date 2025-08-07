import mongoose from "mongoose";
// import productModel from '../models/ProductModel1.js';
import productModel from "./ProductModel.js";
import Especificaciones from "../models/EspecificacionesModel.js";

mongoose.pluralize(null);

const Collections1 = "ShoppingsPago";

const SchemaShoppingsPago = new mongoose.Schema(
  {
    IdUsu: { type: "String", required: true },
    FechaCarro: { type: "Date" },
    TotalCarro: { type: "Number" },
    DetalleCarro: {
      type: [
        {
          pid: mongoose.Schema.Types.ObjectId,
          eid: mongoose.Schema.Types.ObjectId,
          IdProductCarro: { type: "number", required: true },
          CantProduct: Number,
          ParcialProduct: Number,
        },
      ],
      ref: "products",
    },
  },
  { timestamps: true }
);

// Este middleware se va a encargar automáticamente de completar en base a la referencia de arriba

SchemaShoppingsPago.pre("findOne", function () {
  this.populate({ path: "DetalleCarro.pid", model: productModel });
});

SchemaShoppingsPago.pre("findOne", function () {
  this.populate({ path: "DetalleCarro.eid", model: Especificaciones });
});

export default mongoose.model(Collections1, SchemaShoppingsPago);
