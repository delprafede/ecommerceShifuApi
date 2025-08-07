import SchemaProduct from "../models/ProductModel.js";
import Especificaciones from "../models/EspecificacionesModel.js";
import  Shoppings  from "../models/shopping.models.js";


// Endpoint para obtener todos los productos
export const GetProducts = async (req, res) => {
  try {
    const Product = await SchemaProduct.find();

    res.status(200).send(Product);
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
};
export const productCard = async (req, res) => {
  // console.log(req.params.id)
  try {
    const product = await SchemaProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "producto no encontrado" });
    } else {
      
      res.json(product);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const GetEspecificaciones = async (req, res) => {
  const obj = req.body
  
  try {
    const Product = await Especificaciones.find(obj);

    res.status(200).send(Product);
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
};

export const GetEspecificaiones = async (req, res) => {
  const obj = new Object();
  obj.Talle = req.body.talle;
  obj.Color = req.body.color;
  obj.IdProductEspeci = req.body.IdProduct;

  try {
    const ProductE = await Especificaciones.findOne(obj);

    res.status(200).send(ProductE);
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
};
//ELIMINA EL CARRITO DEL USUARIO (FUNCIONANDO)
export const deleteShopping = async (req, res) => {
  console.log(req.params.id);
  try {
    const deleteShopping= await Shoppings.findOneAndDelete({product:req.params.id});
    console.log(deleteShopping)
    // if (!deleteShopping)
    //   // return res
    //   //   .status(404)
    //   //   .json({ message: "el producto ya no se encuentra" });

    return res.sendStatus(204);
    //todo estubo bien no te voy a devolver nada
    //no devuelva nada(no hay contenido)solo que se haya borrado correctamente
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
