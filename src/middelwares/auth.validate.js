import { check } from "express-validator";
import validateResult from "./validate.express.js";

export const validatorAuth = [
  check("nameUser", "el name es requerido").notEmpty(),
  check("email", "el email es requerido").isEmail().exists(),
  check("password", "el password es requerido").exists().isLength({ min: 6 }),
  (req, res,next) => {
    validateResult(req, res, next)
  },
];

