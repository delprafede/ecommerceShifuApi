import Comentries from "../models/coment.models.js";

export const createComentries = async (req, res) => {
  console.log(req.body);
  const { description, id, date } = req.body;
  try {
    const newComentaries = new Comentries({ description, date, id });
    const saveComentaries = await newComentaries.save();
    res.status(200).json({ Status: 200, data: saveComentaries });
  } catch (error) {
    res
      .status(400)
      .json({ Status: 400, data: "no pasa", message: error.message });
  }
};
export const getComentries = async (req, res) => {
  try {
    const comentarios = await Comentries.find({ id: req.params.id });
    if (!comentarios) {
      return res
        .status(404)
        .json({ Status: 404, message: "Comentario no encontrado" });
    } else {
      res.status(200).json( comentarios );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
