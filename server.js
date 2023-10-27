/** @format */

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "smtp-legacy.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "contacto@zx-studio.com",
    pass: "ZXStudio2023",
  },
});

const destinatario = "contacto@zx-studio.com";

app.post("/send-email", (req, res) => {
  const { contactName, contactEmail, contactPhone, contactMessage } = req.body;

  const mailOptions = {
    from: "contacto@zx-studio.com",
    to: destinatario,
    subject: "Nuevo mensaje de contacto",
    text: `Nombre: ${contactName}\nEmail: ${contactEmail}\nTeléfono: ${contactPhone}\nMensaje: ${contactMessage}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error al enviar el correo");
    } else {
      console.log("Correo enviado: " + info.response);
      res.status(200).send("Correo enviado con éxito");
    }
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});
