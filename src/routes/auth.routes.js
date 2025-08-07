import { Router } from "express";
import {
  login,
  logout,
  register,
  sendEmail,
  updatePassword,
  verifyToken,
  profile
} from "../controllers/auth.controllers.js";
// import { check } from "express-validator";
import { validatorAuth } from "../middelwares/auth.validate.js";
import { authRequired } from "../middelwares/validateToken.js";

const router = Router();

router.post("/register", validatorAuth, register);

router.post("/login", login);

router.post("/sendEmail", sendEmail);

router.put("/forgotPassword/:id/:token", updatePassword);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

export default router;
