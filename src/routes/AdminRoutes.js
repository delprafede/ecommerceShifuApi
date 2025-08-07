import { Router } from "express";
import multer from "multer";
import {
  GetProducts,
  GetProduct,
  GetCompleteProduct,
  CreateProducts,
  CreateEspecificaciones,
  UploadEspecificaciones,
  UpdateProduct,
  UpdatePicture,
  DeleteProduct,
  DeleteEspecificaciones,
  DeleteImage,
  AddImagesProduct,
} from "../controllers/AdminController.js";

const router = Router();

const upload = multer({
  storage: multer.diskStorage({}),
}).fields([{ name: "file", maxCount: 4 }]);

router.get("/Admin/:id", GetProduct);
router.get("/Admin", GetProducts);
router.post("/Admin/Product", GetCompleteProduct);
router.post("/Admin/Crea", CreateProducts);
router.post("/Admin/AddImg", AddImagesProduct);
router.post("/Admin/Especificaciones", CreateEspecificaciones);
router.put("/Admin/Especificaciones", UploadEspecificaciones);
router.put("/Admin/Product", UpdateProduct);
router.put("/Admin/Picture", [upload], UpdatePicture);
router.delete("/Admin/Product/:id", DeleteProduct);
router.delete("/Admin/Especificaciones", DeleteEspecificaciones);
router.delete("/Admin/Picture", DeleteImage);

export default router;
