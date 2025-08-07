import { Router } from "express";
import { authRequired } from "../middelwares/validateToken.js";
import {
  getFavorites,
  productCard,
  deleteFavorite,
  createFavorites,
} from "../controllers/fav.controllers.js";
import { validatorFav } from "../middelwares/validate.fav.js";

const router = Router();

router.post("/favorites", validatorFav, createFavorites);

router.get("/pageFavorites", authRequired, getFavorites);

// router.get("/productCard/:id",authRequired, productCard);

router.delete("/pageFavorites/:id", deleteFavorite);

export default router;
