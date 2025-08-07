import jwt from "jsonwebtoken"
import { tokenSecret } from "../config.js" ;



 export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(400).send({
      message: "sin autorizacion debes loguearte",
    });
   jwt.verify(token, tokenSecret, (err, user) => {
    if(err) return res.status(400).send({
        message: "token invalido"
    })
    req.user = user
   })
 
  next();
};