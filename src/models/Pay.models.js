import mongoose from "mongoose";

mongoose.pluralize(null);

const Collections3 = "Pay";

const SchemaPay = new mongoose.Schema(
  {
    IdUsu: { type: "String", required: true },
    TotalPay: { type: "Number" },
    // TipoPagoPay : {type: "String", enum: ['Transferencia', 'Tarjeta', 'Mercado Pago'], default: 'Mercado Pago'},
    DetallePay: {
      type: [
        {
          IdProductCarro: { type: "number" },
          ImgCarro: { Type: "String" },
          NomArtCarro: { type: "String" },
          TalleCarro: { type: "Number" },
          ColorCarro: { type: "String" },
          PcioCarro: { type: "Number" },
          CantProduct: { type: "Number" },
          ParcialCarro: { type: "Number", default: 0 },
        },
      ],
      ref: "products",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(Collections3, SchemaPay);
