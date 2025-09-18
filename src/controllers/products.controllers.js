import SchemaProduct from "../models/ProductModel.js";
import Especificaciones from "../models/EspecificacionesModel.js";
import Shoppings from "../models/shopping.models.js";

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

export const GetEspecificacionesT = async (req, res) => {
  const obj = req.body;
  try {
    const Product = await Especificaciones.find(obj);

    res.status(200).send(Product);
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
};

export const GetEspecificaiones = async (req, res) => {

  const {Cart}= req.body;
  const obj = new Object();
  obj.Talle = Cart.talle;
  obj.Color = Cart.color;
  obj.IdProductEspeci = Cart.IdProduct;


  try {
    const ProductE = await Especificaciones.findOne(obj);


    res.status(200).send(ProductE);
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
};

