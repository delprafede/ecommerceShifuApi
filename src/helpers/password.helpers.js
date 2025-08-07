import bcrypt from "bcrypt";
import { salt } from "../config.js"


export async function Hash(password) {
  return await bcrypt.hash(password, salt);
}
