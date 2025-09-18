import { Router } from "express";
import {
  // GetProductShoping,
  createProductShopinng,
  // PushProduct,
  // DeleteProduct,
  deleteProductShopping,
  ConfirmaShopping,
  GetCompleteProduct,
  GetShopingByIdUsu,
} from "../controllers/ShoppingController.js";
import { createOrder } from "../controllers/pago.controllers.js";

import { authRequired } from "../middelwares/validateToken.js";

const router = Router();

// RUTA QUE LLEVA AL FRONT LOS PRODUCTOS DEL CARRITO
router.get("/carritos", authRequired, GetShopingByIdUsu);

router.post("/carrito", createProductShopinng);

// router.post("/IdUsu", GetShopingByIdUsu);

// router.patch("/", PushProduct);

// router.delete("/carrito", DeleteProduct);

router.delete("/elimina", deleteProductShopping);

router.post("/carrito/confirma", ConfirmaShopping); // segunda opcion para los pagos del product

// router.post("/Admin", CreateProducts);

// router.get("/Admin", GetProducts);

// router.post("/Admin/Especificaciones", CreateEspecificacioness);//no esta funcionando se creo una nueva ruta

router.get("/Admin/Especificaciones", GetCompleteProduct);

export default router;
