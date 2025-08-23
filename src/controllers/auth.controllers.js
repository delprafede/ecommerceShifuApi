import { Hash } from "../helpers/password.helpers.js";
import Users from "../models/user.models.js";
import { createAccesToken } from "../libs/jwt.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { tokenSecret } from "../config.js";
import { Resend } from "resend";

//registrarse
export const register = async (req, res) => {
  //errors handling
  try {
    const { nameUser, email, password } = req.body;

    const userFound = await Users.findOne({ email });
    if (userFound)
      return res.status(400).json({ msg: "El email ya esta en uso" });

    const passwordHash = await Hash(password);

    const newUser = new Users({
      nameUser,
      email,
      password: passwordHash,
    });
    // Se guarda en la database
    const userSaved = await newUser.save();

    const token = await createAccesToken({ id: userSaved._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      id: userSaved._id,
      nameUser: userSaved.nameUser,
      email: userSaved.email,
      rule: userSaved.rule,
      msg: "Usuario creado correctamente",
    });
  } catch (error) {
    // console.log(error);
    res
      .status(500)
      .send({ status: false, data: error.message });
  }
};
//Loguearse
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await Users.findOne({ email });

    if (!userFound)
      return res.status(400).send({
        message: "Usuario o contrasena erronea",
      });
    // const validPass = await Compare(password, userFound.password);
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res
        .status(400)
        .send({ message: "Usuario o contrasena erronea" });
    //token
    const token = await createAccesToken({ id: userFound._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      // expires: new Date(Date.now() + 3600000), // 1 hour
      
    });

    //(dto)

    res.status(200).json({
      id: userFound._id,
      nameUser: userFound.nameUser,
      email: userFound.email,
      rule: userFound.rule,
      msg: "Usuario logueado correctamente",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
//Cerrar Sesion
export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    res.status(200).json({ message: "Se cerro sesion" });
  } catch (error) {
    res.send(message.error);
  }
};
//perfil del usuario
export const profile = async (req, res) => {

  const userfound = await Users.findById(req.user.id);

  if (!userfound)
    return res.status(400).send({ messaje: "usuario no encontrado" });
  res.status(200).json({
    id: userfound._id,
    nameUser: userfound.nameUser,
    email: userfound.email,
    createdAt: userfound.createdAt,
    updatedAt:  userfound.updatedAt,
  });
};
// Verificacion Loguin
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(400).send({ message: "No hay Token" });

  jwt.verify(token, tokenSecret, async (err, user) => {
    if (err) return res.status(400).send({ message: "Token Invalido" });
    const userFound = await Users.findById(user.id);
    if (!userFound)
      return res.status(400).send({ message: "Usuario No Encontrado" });

    return res.status(200).json({
      id: userFound._id,
      nameUser: userFound.nameUser,
      email: userFound.email,
      rule: userFound.rule,
      data: "Verificacion Exitosa",
    });
  });
};
//Envio de correo para reestablecer contraseña
export const sendEmail = async (req, res) => {
  const { email } = req.body;
  const { id, token } = req.params;
  try {
    const userFound = await Users.findOne({ email });
    if (!userFound) return res.status(400).send("El usuario no existe");

    const token = await createAccesToken({ password: userFound._id });
    res.cookie(
      "token",
      token,
      {
        sameSite: "none",
        secure: true,
      },
      {
        expires: "1h", //Tiempo que dura la cookie en el navegador
      }
    );
    // Enviar correo electronico con el link del id y token (cuando usen el token al recargar la pagina se loguea con el usuario!!!!😩)
    const resend = new Resend("re_MihMh3ky_9H2e5FLoj8SdhwSB1ah8DNh1");

    (async function () {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [userFound.email],
        subject: "Reestablecer contraseña",
        html: `http://localhost:5173/forgotPassword/${userFound._id}/${token}`,
      });

      if (error) {
        return console.error({ error });
      }
    })();
    return res.status(200).json({ Status: "Success" });
  } catch (error) {
    res.status(400).json("hay errores");
  }
};
//Cambiar Contraseña
export const updatePassword = async (req, res) => {
  const { password } = req.body;
  const { id, token } = req.params;
  try {
    jwt.verify(token, tokenSecret, async (err, user) => {
      if (err) {
        res.status(400).send({ message: "Token Invalido" });
      } else {
        const userFound = await Users.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        const passwordHash = await Hash(password);
        userFound.password = passwordHash;
        userFound.save();

        res.status(200).json({
          status: "Success",
          User: userFound.email,
          msg: "password modificado",
        });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
};
