import { Router } from "express";
import { authRequired } from "../middelwares/validateToken.js";
import { createContacto } from "../controllers/contacto.controllers.js";

const router = Router();

router.post("/contacto", authRequired, createContacto);

export default router;
