 import jwt from "jsonwebtoken";
 import { tokenSecret } from "../config.js";
 
 
 export const createAccesToken = (payload) => {

  return  new Promise((resolve, reject) => {
        jwt.sign(
            payload,  //payload
            tokenSecret, //secret
            { 
                expiresIn: '8h'   //obsiones
            },  
            (err, token) => {
                if (err) reject(err) 
                resolve(token)
            }
        )
    })
}