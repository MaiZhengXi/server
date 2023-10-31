/** @format */

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const destinatario = "contacto@zx-studio.com";

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "http://www.zx-studio.com/contact.html"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const sendConfirmationEmail = (email, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-legacy.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "contacto@zx-studio.com",
      pass: "ZXStudio2023",
    },
  });

  const mailOptions = {
    from: "contacto@zx-studio.com",
    to: email,
    subject: "Gracias por ponerse en contacto con nosotros",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo de confirmación enviado: " + info.response);
    }
  });
};

app.post("/send-email", (req, res) => {
  const { contactName, contactEmail, contactPhone, contactMessage } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp-legacy.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "contacto@zx-studio.com",
      pass: "ZXStudio2023",
    },
  });

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

      const confirmationMessage = `Gracias por ponerse en contacto con nosotros. Hemos recibido su mensaje y nos pondremos en contacto con usted a la brevedad.
      
      Atentamente,
      Equipo de ZX Studio`;

      sendConfirmationEmail(contactEmail, confirmationMessage);
    }
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
