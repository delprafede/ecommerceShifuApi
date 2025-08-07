import mongoose from "mongoose";
import { configEnv } from "../config.js";
import colors from "colors"

mongoose.set("strictQuery", true);

export const connectDb = async () => {
  try {
    await mongoose.connect(configEnv.dbConfig.host);
    console.log(colors.green.bgGreen(`Conectada a db correctamente`));
  } catch (error) {
    console.log(`error al conectar db ${error}`);
  }
};
