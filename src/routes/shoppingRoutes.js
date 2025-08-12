import { Router } from "express";
import {
  // GetProductShoping,
  PostProduct,
  // PushProduct,
  DeleteProduct,
  ConfirmaShopping,
 
  GetCompleteProduct,

  GetShopingByIdUsu,
} from "../controllers/ShoppingController.js";
import { createOrder } from "../controllers/pago.controllers.js";
import { deleteShopping } from "../controllers/products.controllers.js";
import { authRequired } from "../middelwares/validateToken.js";

const router = Router();

// router.get('/:id', GetProductShoping)
// RUTA QUE LLEVA AL FRONT LOS PRODUCTOS DEL CARRITO
router.get("/carritos",authRequired, GetShopingByIdUsu);

router.post("/carrito", PostProduct);

// router.post("/IdUsu", GetShopingByIdUsu);

// router.patch("/", PushProduct);

router.delete("/carrito", DeleteProduct);

router.delete("/elimina/:id", deleteShopping);

router.post("/carrito/confirma", ConfirmaShopping ); // segunda opcion para los pagos del product

// router.post("/Admin", CreateProducts);

// router.get("/Admin", GetProducts);

// router.post("/Admin/Especificaciones", CreateEspecificacioness);//no esta funcionando se creo una nueva ruta

router.get("/Admin/Especificaciones", GetCompleteProduct);

export default router;
