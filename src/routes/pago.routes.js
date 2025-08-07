import { Router } from "express";
import {
  createOrder,
  receiveWebhook,
} from "../controllers/pago.controllers.js";
const router = Router();

router.post("/create-order", createOrder);

router.get("/success", (req, res) => res.send("Succes") );
router.get("/failure", (req, res) => res.send("Failure"));
router.get("/pending", (req, res) => res.send("Pending"));

router.post("/webhook", receiveWebhook);

export default router;
