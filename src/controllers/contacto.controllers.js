import ContactoUser from "../models/contactoUser.models.js";

export const createContacto = async (req, res) => {
  console.log("entrando: createContacto")
  const { nameUser, email, description, date } = req.body;
  // console.log(req.user);
  const newContacto = new ContactoUser({
    nameUser,
    email,
    description,
    date,
    idUser: req.user.id,
  });

  const saveContacto = await newContacto.save();
  res.status(200).json(saveContacto);
};
