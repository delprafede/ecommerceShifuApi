import SchemaProduct from "../models/ProductModel.js";
import Especificaciones from "../models/EspecificacionesModel.js";
// import { UploadPicture } from "./CloudinaryProductController.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

// Endpoint para crear todos los productos (FUNCIONANDO)
async function CreateProducts(req, res) {
  console.log(req.body);
  try {
    const {
      IdProduct,
      NombreProducto,
      Precio,
      Detalle,
      UltimoPrecio,
      Categoria,
    } = req.body;

    const NewProduct = SchemaProduct({
      IdProduct,
      NombreProducto,
      Precio,
      Detalle,
      UltimoPrecio,
      Categoria,
      Especificaciones: [],
    });
    if (req.files?.UrlImagen) {
      console.log(req.files.UrlImagen);
      const result = await uploadImage(req.files.UrlImagen.tempFilePath);
      // console.log(result);
      NewProduct.UrlImagen = {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
      await fs.unlink(req.files.UrlImagen.tempFilePath);
      // }
    }
    await NewProduct.save();
    // console.log(req.files);
    res.status(200).send({ status: " Ok, subiendo producto" });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}
// Enpoint para agregar imagenes al producto

async function AddImagesProduct(req, res) {
  try {
    // const { id } = req.params;
    const { _id } = req.body;
    console.log(req.body._id);

    const Product = await SchemaProduct.findById(_id);
    if (req.files?.UrlImagen) {
      console.log(req.files.UrlImagen);
      const result = await uploadImage(req.files.UrlImagen.tempFilePath);
      Product.UrlImagen.push({
        secure_url: result.secure_url,
        public_id: result.public_id,
      });
      await fs.unlink(req.files.UrlImagen.tempFilePath);
    }
    await Product.save();
    res.status(200).send({ status: "OK", data: Product });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

// Endpoint para obtener todos los productos
async function GetProducts(req, res) {
  try {
    const Product = await SchemaProduct.find();

    res.status(200).send({ status: "OK", data: Product });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}
// Endpoint para obtener un producto
async function GetProduct(req, res) {
  try {
    const { id } = req.params;

    const Product = await SchemaProduct.findById(id);

    res.status(200).send({ status: "OK", data: Product });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

// Endpoint para obtener producto completo
async function GetCompleteProduct(req, res) {
  const ids = { id: req.body.id, id2: req.body.id2 };

  const id = ids.id;
  const id2 = ids.id2;
  try {
    const Product = await SchemaProduct.findById(id);
    const ArrayEsp = Product.Especificaciones;

    const Especific = ArrayEsp.find((element) => element.id._id == id2);

    res.status(200).send({ status: "OK", data: Especific });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

// async function CreateProducts(req, res) {
//   try {
//     // const { IdProduct,NombreProducto,Precio,Detalle,UltimoPrecio,Categoria}= req.body;

//     const Prod = {
//       IdProduct: req.body.IdProduct,
//       NombreProducto: req.body.NombreProducto,
//       Precio: req.body.Precio,
//       Detalle: req.body.Detalle,
//       Categoria: req.body.Categoria,
//       UltimoPrecio: req.body.UltimoPrecio,
//     };

//     const IdProduct = Prod.IdProduct;
//     const NombreProducto = Prod.NombreProducto;
//     const Precio = Prod.Precio;
//     const Detalle = Prod.Detalle;
//     const UltimoPrecio = Prod.UltimoPrecio;
//     const Categoria = Prod.Categoria;
//     //  if(Product){}
//     //      res.status(500).send({ status: 'ERR', data:"EL producto ya existe" });
//     //  }else{
//     const NewProduct = await SchemaProduct.create({
//       IdProduct,
//       NombreProducto,
//       Precio,
//       Detalle,
//       UltimoPrecio,
//       Categoria,
//       Especificaciones: [],
//     });

//     if (NewProduct) {
//       res.status(200).send({ status: "OK", data: NewProduct });
//     }
//     // }
//   } catch (err) {
//     res.status(500).send({ status: "ERR", data: err.message });
//   }
// }

// Endpoint para Crear Especificaciones
async function CreateEspecificaciones(req, res) {
  // console.log(req);
  try {
    const E = {
      Color: req.body.Color,
      CodColor: req.body.CodColor,
      Talle: req.body.Talle,
      Stock: req.body.Stock,
      Fecha: req.body.Fecha,
      CodProducto: req.body.CodProducto,
      _IdProduct: req.body._IdProduct,
    };
    console.log(E);
    const Color = E.Color;
    const CodColor = E.CodColor;
    const Talle = E.Talle;
    const Stock = E.Stock;
    const Fecha = E.Fecha;
    const CodProducto = E.CodProducto;
    const _IdProduct = E._IdProduct;

    const NewProduct = await Especificaciones.create({
      Color,
      CodColor,
      Talle,
      Stock,
      Fecha,
      CodProducto,
      _IdProduct,
    });

    const Especific = await Especificaciones.findOne({
      Color: Color,
      Talle: Talle,
      _IdProduct: _IdProduct,
    });

    await SchemaProduct.updateOne(
      { _id: _IdProduct },
      { $push: { Especificaciones: { id: Especific._id } } }
    );

    if (NewProduct) {
      res.status(200).send({ status: "OK", data: NewProduct });
    }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
  // res.status(200).send({ status: "OK", mesg: "entrando" });
}

// Endpoint para Modificar Especificaciones
async function UploadEspecificaciones(req, res) {
  try {
    const New = {
      CodColor: req.body.CodColor,
      Stock: req.body.Stock,
      Fecha: req.body.Fecha,
      CodProducto: req.body.CodProducto,
      id: req.body.id,
      Estado: req.body.Estado,
    };

    const CodColor = New.CodColor;
    const Stock = New.Stock;
    const CodProducto = New.CodProducto;
    const id = New.id;
    const Estado = New.Estado;

    const Especific = await Especificaciones.findByIdAndUpdate(
      id,
      {
        CodColor: CodColor,
        Stock: Stock,
        CodProducto: CodProducto,
        Estado: Estado,
      },
      { new: true }
    );

    if (Especific) {
      res.status(200).send({ status: "OK", data: Especific });
    }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

// Endpoint para Modificar Product
async function UpdateProduct(req, res) {
  const { id } = req.body;
  try {
    const product = await SchemaProduct.findByIdAndUpdate(
      id,

      req.body,
      { new: true }
    );

    if (product) {
      res.status(200).json({
        ok: true,
        data: product,
      });
    }
    await product.save();
  } catch (ex) {
    return res.status(400).json({ error: "Producto no encontrado" });
  }
}

// Endpoint para subir la imagen
async function UpdatePicture(req, res) {
  try {
    const _id = req.body._id;
    const picture = req.files.file[0];

    // console.log(req.body);
    // console.log(picture);

    const result = await UploadPicture(picture);
    // console.log(result);

    const secure_url = result.secure_url;

    const response = await SchemaProduct.findById(_id);
    response.UrlImagen.push(secure_url);

    const saveImage = await response.save();

    if (response) {
      res.status(200).json({
        ok: true,
        data: saveImage,
      });
    }
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      err: ex.message,
    });
  }
}

// Endpoint para Borrar producto entero
async function DeleteProduct(req, res) {
  const { id } = req.params;

  try {
    const ProductDelete = await SchemaProduct.findByIdAndDelete(id);
    if (ProductDelete) {
      await deleteImage(ProductDelete);

      return res
        .status(200)
        .send({ status: "ok", data: "Se elimino el prducto" });
    } //replit/znpyhz6o151wc4zh8mgw
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

// Endpoint para Borrar objeto de Especificaciones
async function DeleteEspecificaciones(req, res) {
  try {
    const Delete = req.body;

    const id = Delete.id;
    const id2 = Delete.id2;

    const DeleteEspecificaciones = await Especificaciones.findByIdAndDelete(
      id2
    );
    await SchemaProduct.findByIdAndUpdate(id, {
      $pull: { Especificaciones: { id: { _id: id2 } } },
    });
    if (DeleteEspecificaciones) {
      res.status(200).send({ status: "ok", data: "Se Elimino" });
    }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}
// Endpoint para Borrar objeto de Especificaciones
async function DeleteImage(req, res) {
  try {
    const Delete = { id, id2 };

    const id = Delete.id;
    const id2 = Delete.id2;

    const DeleteEspecificaciones = await SchemaProduct.findById(id);

    DeleteEspecificaciones.UrlImagen.pull;

    await DeleteEspecificaciones.save();

    res.status(200).send({ status: "ok", data: "Se Elimino" });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}
export {
  GetProduct,
  GetProducts,
  GetCompleteProduct,
  CreateProducts,
  CreateEspecificaciones,
  UploadEspecificaciones,
  UpdateProduct,
  UpdatePicture,
  DeleteProduct,
  DeleteEspecificaciones,
  DeleteImage,
  AddImagesProduct,
};
