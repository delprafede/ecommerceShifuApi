import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
} from "../config.js";

// Configuracion
export const uploadImage = async (filePath) => {
  cloudinary.config({
    cloud_name: "dvvuuxwxz",
    api_key: "983433394724938",
    api_secret: "_FI8dtUk9cH7eJ9wKhFvKaCMHUE",
    secure: true,
  });

  //   Carga de imagenes a la nube creando su carpeta
  return await cloudinary.uploader.upload(filePath, {
    folder: "ImagenesEcommerce",
  });
};

export const deleteImage = async (publiId) => {
  // console.log(publiId.UrlImagen.map((img) => img.public_id), "este es el id de la imagen a eliminar");
  // Eliminacion de imagenes de la nube
  try {
    return await cloudinary.uploader.destroy(
      publiId.UrlImagen.map((img) => img.public_id)
    );
  } catch (error) {
    console.log(error);
  }
};
