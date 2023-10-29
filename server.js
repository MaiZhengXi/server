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

// Agrega un middleware para permitir solicitudes CORS desde tu sitio web
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

app.post("/send-email", (req, res) => {
  const { contactName, contactEmail, contactPhone, contactMessage } = req.body;
  console.log("kkk" + req.body);

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
  console.log(mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error al enviar el correo");
    } else {
      console.log("Correo enviado:XXXX " + info.response);
      res.status(200).send("Correo enviado con éxito");
    }
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});
