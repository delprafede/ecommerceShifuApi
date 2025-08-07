import mercadopago from "mercadopago";

import { TokenMercadoPago } from "../config.js";
// SDK de Mercado Pago
import  {MercadoPagoConfig, Preference}  from "mercadopago";
// import  Payment  from "mercadopago";

export const createOrder = async (req, res) => {
  const { TotalCarro, user } = req.body;
  console.log(req.body)

  try {
    // const payment =  new Payment(client)
    // mercadopago.configure({
    //   access_token: TokenMercadoPago,
    // });
    const client = new MercadoPagoConfig({ accessToken: TokenMercadoPago });

    var preference = {
      items: [
        {
          description: user,
          title: user,
          quantity: 1,
          currency_id: "ARS",
          unit_price: TotalCarro,
        },
      ],
      back_urls: {
        success: "https://www.youtube.com/watch?v=Gykudr8IAfc",
        failure: "https://www.youtube.com/watch?v=Gykudr8IAfc",
        pending: "https://www.youtube.com/watch?v=Gykudr8IAfc",
      },
      auto_return: "approved",
      notification_url:
      //Cargar la nueva ruta de ngrok al levantar el servidor
        "https://9ffe-186-124-62-229.ngrok-free.app/api/webhook",
    };
    //PIDIENDO UNA ORDEN DE COMPRA
    // const result = await mercadopago.preferences.create(preference);
    const preferenceClient = new Preference(client);
    const result = await preferenceClient.create({
      body: preference,
    });
    
   
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creando Orden de Pago");
  }
};

export const receiveWebhook = async (req, res) => {
  const payment = req.query;
  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
      console.log("soy webhook created");
      //Luego guardara en la database
    }
    res.status(200).json("soy la pagina");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error recibiendo Webhook");
  }
};

