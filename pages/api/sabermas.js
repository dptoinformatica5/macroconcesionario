let nodemailer = require("nodemailer");
require("dotenv").config();
const imgPath = "http://cdn.macroconcesionario.com/img/";

const transport = {
  host: "mail.macroconcesionario.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_KEY,
  },
};

export default async function contact(req, res) {
  const { body } = req;
  verifyToken(body, res);
}
const sendEmail = (body, res) => {
  const transporter = nodemailer.createTransport(transport);
  transporter.verify(function(err, success) {
    if (!err) {
      const mailData = {
        from: "info@macroconcesionario.com",
        to: "comercial@macroconcesionario.com",
        repplyTo: "info@macroconcesionario.com",
        subject: "¡Correo recibido! - Macroconcesionario",
        attachments: [
          {
            filename: "logo.png",
            path: imgPath + "logo.png",
            cid: "logo",
          },
          {
            filename: body.img || "coches-electricos-online.webp",
            path:
              body.imageFormatted || imgPath + "coches-electricos-online.webp",
            cid: "img",
          },
        ],
        html: `<html>
                    <head>
                        <style>
                            @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700&display=swap');
                        </style>
                    </head>
                    <body style='font-family: Montserrat'>
                        <div style='width:80%;margin:auto;margin-top:40px;padding:20px 40px;border-color:lightgray;border-width:0 1px;border-style:solid'>
                            <h1 style='text-align:center;color:rgb(129,23,19)'>Macroconcesionario</h1>
                            <h2 style='text-align:center;color:rgb(70,70,96)'>Mensaje recibido a través del formulario de Saber más</h2>
                            <br>
                            <p style='color:rgb(70,70,96)'>Nombre: <b>${body.customer}</b></p>                       
                            <p style='color:rgb(70,70,96)'>Telefono: <b>${body.phone}</b></p>
                            <br>
                            <div style='margin:auto;text-align:right'>
                                <img src='cid:logo' style='width:150px;'/>
                            </div>
                            <br><br>
                        </div>
                    </body>
                </html>`,
      };

      transporter.sendMail(mailData, function(err, info) {
        if (err) {
          console.log(err);
          res.status(500).send({
            status: "error",
            error: "ERROR No se ha podido mandar el mensaje.",
            err,
          });
        } else {
          return res.send({ status: "success" });
        }
      });
    } else {
      console.log(err);
      res
        .status(500)
        .send({ status: "error", error: "ERROR al conectar a smtp.", err });
    }
  });
};

const verifyToken = async (body, res) => {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${body.token}`,
      { method: "POST" }
    );
    const data = await response.json();
    if (!data || !data.success) {
      return res
        .status(403)
        .send({ status: "error", error: "ERROR Recaptcha no es válido." });
    }
    sendEmail(body.state, res);
  } catch (err) {
    return res
      .status(403)
      .send({ status: "error", error: "ERROR Recaptcha no es válido." });
  }
};
