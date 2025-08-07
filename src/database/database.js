


import mongoose from "mongoose";

mongoose.set("strictQuery", true);

function connect() {
  mongoose
    .connect ("mongodb+srv://bscistri:keHeDuhBv8MikkAQ@models.rin05k5.mongodb.net/Models")
    .then((res) =>
      console.log("Conectado correctamente a la base de datos de mongoose")
    )
    .catch((err) => console.log(err));
}



export default connect