import express from "express";
// import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import shoppingRouter from "./routes/shoppingRoutes.js";
import { configEnv } from "./config.js";
import { connectDb } from "./database/db.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import cookieParser from "cookie-parser";
import authRouters from "./routes/auth.routes.js";
import favRouters from "./routes/fav.routes.js";
import pagoRouters from "./routes/pago.routes.js";
import productsRouters from "./routes/products.routes.js";
import comentRoutes from "./routes/coment.routes.js";
import contactoRoutes from "./routes/contactoUser.routes.js";
import "dotenv/config.js";
import colors from "colors";


const app = express();
// const whitelist = [/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/];

try {
  app.use(
    cors({
      // origin: ["*"],
      origin: "http://localhost:5173",
      // origin: function (origin, callback) {
      //   if (!origin) return callback(null, true); // para Postman o curl
      //   const isAllowed = whitelist.some((regex) => regex.test(origin));
      //   if (isAllowed) {
      //     callback(null, true);
      //   } else {
      //     callback(new Error("No permitido por CORS"));
      //   }
      // },
      credentials: true,
      methods: ["GET,PUT,POST,DELETE"],
      // credentials: true,
      // optionsSuccessStatus: 204,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./uploads",
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); //Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes. con cargas útiles codificadas en URL y se basa en body-parser .
  app.use(cookieParser());

  app.use("/api", authRouters);
  app.use("/api", favRouters);
  app.use("/api", productsRouters);
  // app.use("/api", shoppingRouter);
  app.use("/api", shoppingRouter);
  app.use("/api", pagoRouters);
  app.use("/api", comentRoutes);
  app.use("/api", contactoRoutes);
  app.use("/api", AdminRoutes);

  connectDb();

  app.listen(configEnv.appPort.port, () => {
    console.log(
      colors.green.bgGreen(
        `Servidor corriendo en port: ${configEnv.appPort.port}`
      )
    );
  });
} catch (err) {
  console.log(`Error al Inicializar Backend ${err.message}`);
}
