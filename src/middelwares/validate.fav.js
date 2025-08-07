import { check } from "express-validator";
import validateResult from "./validate.express.js";

export const validatorFav = [
  check("product", "producto es requerido").notEmpty(),
   // check("description", "description es requerido").notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
