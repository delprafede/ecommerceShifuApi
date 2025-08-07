import { Router } from "express";
import { getComentries, createComentries } from "../controllers/coment.controllers.js"; 

const router = Router();

router.post("/comentrie", createComentries );
router.get("/comentries/:id", getComentries);

 export default router;