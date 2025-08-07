import { Router } from "express";
import { productCard,GetProducts, GetEspecificaiones,GetEspecificaciones} from "../controllers/products.controllers.js";

const router = Router();

router.get('/products',GetProducts);

router.get('/productCard/:id',productCard);

router.post('/productCardE',GetEspecificaiones);

router.post('/productCardT',GetEspecificaciones);


export default  router;
