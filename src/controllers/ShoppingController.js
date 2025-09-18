import Shoppings from "../models/shopping.models.js";
import Pay from "../models/Pay.models.js";
import SchemaPago from "../models/shopping.Pago.js";
import SchemaProduct from "../models/ProductModel.js";
import Especificaciones from "../models/EspecificacionesModel.js";
import SchemaShoppings from "../models/shopping.models.js";

//BUSCA SI EXISTE CARRITO DEL USUARIO Y LO LISTA- (FUNCIONANDO)
async function GetShopingByIdUsu(req, res) {
  try {
    const Cart = await SchemaShoppings.findOne({ IdUsu: req.user.id });

    if (Cart) {
      res.status(200).json(Cart);
      // res.status(200).json({ status: "OK", data: Cart });
    }
    // else {
    //   res.status(400).send({
    //     status: "ERR",
    //     data: "CUIDADO No Existe Carrito para este Usuario",
    //   });
    // }
  } catch (err) {
    res.status(400).send({ status: "ERR", data: err.message });
  }
}
//CREA - AGREGA PRODUCTOS - MODIFICA LA CANTIDAD DE UN PRODUCTO EN UN CARRITO PARA UN USUARIO (FUNCIONANDO)
export const createProductShopinng = async(req, res) => {
  const { IdProduct, IdUsu, cantidad, color, eid } = req.body;
  console.log(req.body, "soy el body");

 
  try {
    const Cart = await Shoppings.findOne({ IdUsu: IdUsu });
    console.log(Cart, "soy el detalle carro del usuario")

    const Product = await SchemaProduct.findOne({ IdProduct: IdProduct });
console.log(Product, "soy el producto")
    const Especi = await Especificaciones.findById(eid);
    console.log(Especi, "soy la especificacion")
    const pid = Product._id;
    console.log(pid, "soy el pid")
    const IdArtCarro = Especi.CodArt;
    console.log(IdArtCarro, "soy el IdArtCarro")
  
    // CONSULTO SI EL STOCK ES SUFICIENTE PARA LA CANTIDAD INGRESADA
    if (Especi.Stock >= cantidad) {
      // STOCK SUFICIENTE
      const IdProductCarro = IdProduct;

      // PREGUNTO SI EXISTE UN CARRITO PARA EL USUARIO
      if (Cart) {
        // PARA AGREGAR O MODIFICAR ARTICULOS EN EL CARRITO EXISTENTE DE UN USUARIO
        const cid = Cart._id;
        const CC = Cart.DetalleCarro.find((elemento) => {
          return elemento.eid._id == eid;
      
        });

        //BUSCO SI YA EXISTE EL ARTICULO EN EL CARRITO
        if (CC !== undefined) {
          //MODIFICA LA CANTIDAD DEL ARTICULO EXISTENTE EN EL CARRITO
          console.log(CC, "soy el CC")
          const modific = await Shoppings.updateOne(
            { _id: cid, "DetalleCarro._id": CC._id },
            { $set: { "DetalleCarro.$.cantidad": cantidad } },
            { arrayFilters: [{ "DetalleCarro.pid": pid }] }
          );

          res
            .status(200)
            .send({ status: "ok", data: await Shoppings.findById(cid) });
        } else {
          //NO EXISTE EL ARTICULO - AGREGA EL ARTICULO EN EL CARRITO

          const createCard = await Shoppings.updateOne(
            { _id: cid },
            {
              $push: {
                DetalleCarro: {
                  pid,
                  eid,
                  IdProductCarro,
                  IdArtCarro,
                  cantidad,
                  color
                },
              },
            }
            
          );
console.log(createCard, "soy el createCard")
          res
            .status(200)
            .send({ status: "ok", data: await Shoppings.findById(cid), message: "Agregando producto en el carro" });
        }
      } else {
        // CREA EL CARRITO PONIENDO EL PRIMER ARTICULO SELECCIONADO

        const modific = await Shoppings.create({ IdUsu });
        modific.DetalleCarro.push({
          pid,
          eid,
          IdProductCarro,
          IdArtCarro,
          cantidad,
          color
        });

        await modific.save();

        return res.status(200).send({ status: "ok", data: modific, message: "creando carrito desde cero" });
      }
    } else {
      res
        .status(500)
        .send({ status: "err", data: "Cantidad Superior a la Existencia" });
    }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err });
  }
}



//PARA ELIMINAR UN ARTICULO DE UN CARRITO EXISTENTE (FUNCIONANDO)
export const deleteProductShopping = async (req, res) => {
  const { IdUsu, eid } = req.body;

  try {
    const Cart = await Shoppings.findOne({ IdUsu });
   
    const cid = Cart._id;
 
    const CC = Cart.DetalleCarro.find((elemento) => {
      return elemento.eid._id == eid;
    });

    const modifica = await Shoppings.updateOne(
      { _id: cid, "DetalleCarro.eid": eid },
      { $pull: { DetalleCarro: { eid } } },
      { arrayFilters: [{ "DetalleCarro.pid": eid }] }
    );
    if (modifica) {
      res
        .status(200)
        .send({ status: "ok", data: "Se Elmino el Articulo del Carrito" });
    }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
};
//ELIMINA EL CARRITO DEL USUARIO (FUNCIONANDO)
// export const deleteProductShopping = async (req, res) => {
//   console.log(req.params.id);
//   try {
//     const deleteShopping = await Shoppings.findOneAndDelete({
//       product: req.params.id,
//     });
//     console.log(deleteShopping);
//     // if (!deleteShopping)
//     //   // return res
//     //   //   .status(404)
//     //   //   .json({ message: "el producto ya no se encuentra" });

//     return res.sendStatus(204);
//     //todo estubo bien no te voy a devolver nada
//     //no devuelva nada(no hay contenido)solo que se haya borrado correctamente
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

//PARA CONFIRMAR EL CARRITO EXISTENTE (pago)
async function ConfirmaShopping(req, res) {
  try {
    console.log(req.body, "SOY YO el confirma shopping");
    const PayShopping = {
      cid: req.body.cid,
      TotalCarro: req.body.TotalCarro,
    };

    const cid = PayShopping.cid;
    const TotalCarro = PayShopping.TotalCarro;

    const BackShopping = await Shoppings.findById(cid);
    console.log(BackShopping, "soy el BackShopping");

    if (BackShopping) {
      const IdUsu = BackShopping.IdUsu;
      const BackDetalleCarro = BackShopping.DetalleCarro;
      const newCarrito2 = await SchemaPago.create({
        IdUsu,
        FechaCarro: BackShopping.FechaCarro,
        TotalCarro: TotalCarro,
        DetalleCarro: [],
      });
      const newCarrito = await Pay.create({
        IdUsu,
        TotalPay: TotalCarro,
        DetallePay: [],
      });
      for (let i = 0; i < BackDetalleCarro.length; i++) {
        const eid = BackDetalleCarro[i].eid;
        const element = BackDetalleCarro[i];
        const Product = await SchemaProduct.findOne({
          IdProduct: element.pid.IdProduct,
        });
        console.log(Product, "soy el proudcto del carrito");
        const Especi = await Especificaciones.findById(eid);

        newCarrito2.DetalleCarro.push({
          pid: element.pid,
          eid: element.eid,
          IdProductCarro: Product.IdProduct,
          CantProduct: element.cantidad,
          ParcialProduct: Product.Precio * element.cantidad,
        });

        newCarrito.DetallePay.push({
          IdProductCarro: Product.IdProduct,
          PcioCarro: Product.Precio,
          CantProduct: element.cantidad,
          ParcialCarro: Product.Precio * element.cantidad,
          NomArtCarro: Product.NombreProducto,
          TalleCarro: Especi.Talle,
          ColorCarro: Especi.Color,
        });
        const NewStock = Especi.Stock - element.cantidad;
        await Especificaciones.findOneAndUpdate(eid, { Stock: NewStock });
      }

      await newCarrito.save();
      await newCarrito2.save();

      // const dele = await Shoppings.findByIdAndDelete(cid);
      res.status(200).json({
        ok: true,
        data: newCarrito,
        message: "se aprobo la compra del carrito",
      });
    } else {
      res
        .status(500)
        .send({ status: "ERROR CARRO", data: "NO EXISTE CARRITO" });
    }
  } catch (err) {
    res.status(500).send({ status: "ERROR 2", data: err.message });
  }
}

// Endpoint para Crear Especificaciones
// async function Create(req, res) {
//   console.log(req.body);
//   try {
//     const { Color, CodColor, Talle, Stock, Fecha, CodProducto, id } = req.body;

//     const NewProduct = await Especificaciones.create({
//       Color,
//       CodColor,
//       Talle,
//       Stock,
//       Fecha,
//       CodProducto,
//     });

//     const Especific = await Especificaciones.findOne({
//       Color: Color,
//       Talle: Talle,
//     });

//     await SchemaProduct.updateOne(
//       { _id: id },
//       { $push: { Especificaciones: { id: Especific._id } } }
//     );

//     if (NewProduct) {
//       res.status(200).send({ status: "OK", data: NewProduct });
//     }
//   } catch (err) {
//     res.status(500).send({ status: "ERR", data: err.message });
//   }
// }

// Endpoint para obtener producto completo
async function GetCompleteProduct(req, res) {
  const { IdProduct, id } = req.body;
  try {
    const Product = await SchemaProduct.findOne({ IdProduct: IdProduct });
    const Especi = await Especificaciones.findById(id);

    res.status(200).send({ status: "OK", data: Product });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}



export {
  ConfirmaShopping,
  GetCompleteProduct,
  GetShopingByIdUsu,
};
