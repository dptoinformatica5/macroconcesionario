let nodemailer = require("nodemailer");
const {
  isValidPhoneNumber,
  getCountryCallingCode,
} = require("libphonenumber-js");
require("dotenv").config();

const imgPath = "http://cdn.macroconcesionario.com/img/";
const transport = {
  port: 587,
  host: "smtp.ionos.es",
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_KEY,
  },
};
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
export default function contactpdf(req, res) {
  const { body } = req;
  verifyToken(body, res);
  // console.log(body);
}

const sendConfirmationEmail = (body, res) => {
  const transporter = nodemailer.createTransport(transport);
  transporter.verify(function(error, success) {
    if (!error) {
      const mailData = {
        from: "info@macroconcesionario.com",
        to: body.email,
        repplyTo: "info@macroconcesionario.com",

        subject: "¡Correo de confirmación! - Macroconcesionario",
        attachments: [
          {
            filename: "logo.png",
            path: imgPath + "logo.png",
            cid: "logo",
          },
          {
            filename: "sonnen_black.png",
            path: imgPath + "sonnen_black.png",
            cid: "sonnenstromfabrik",
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
                            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

                            img {
                                max-width: 100%;
                                object-fit: cover
                            }
                        </style>
                    </head>
                    <body style='font-family: Roboto'>
                        <div style='width:80%;margin:auto;margin-top:40px;padding:20px 40px;border-color:lightgray;border-width:0 1px;border-style:solid'>
                            <h1 style='text-align:center;color:rgb(129,23,19)'>Macroconcesionario</h1>
                            <div style='margin:auto;text-align:center'>
                                <img src='cid:img' style='height:200px;'/>
                            </div>
                            <h2 style='text-align:center;color:rgb(70,70,96)'>Hemos recibido su email correctamente.</h2>
                            <br>
                            <p style='color:rgb(70,70,96)'>Nos pondremos en contacto con usted lo antes posible.</p>
                            <p style='color:rgb(70,70,96)'>Un saludo.</p>
                            <br>
                            <div style='margin:auto;text-align:right'>
                                <img src='cid:logo' style='width:150px;'/>
                            </div>
                            <br><br>
                            <div class='separator' style='height:1px;border-color:lightgray;border-style:dotted;border-width:2px 0 0 0;'></div>
                            <br>
                            <p style='color:rgb(140,140,140)'><b>Dpto. Ventas.</b></p>
                            <p style='color:rgb(140,140,140)'><b><a href='mailto:comercial@macroconcesionario.com' style='color:rgb(140,140,140)'>comercial@macroconcesionario.com</a></b></p>
                            <p style='color:rgb(140,140,140)'><b>Teléfono : 900 533 961</b></p>
                            <br>
                            <p style='color:rgb(140,140,140);font-size:7px'>Responsable : Soluciones Eteaga SL / info@macroconcesionario.com  principal: Gestionar la relación comercial/profesional. Atender las consultas o remitir la información que nos solicita. Proceder al envío de comunicaciones comerciales por medios electrónicos. | Derechos: Acceso, rectificación, supresión y portabilidad de sus datos, de limitación y oposición a su tratamiento, así como a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado de sus datos, cuando procedan. Información adicional: Puede consultar la información adicional y detallada sobre nuestra política de privacidad en https://macroconcesionario.com/aviso-legal o escribiendo al correo electrónico dptojuridico@macroconcesionario.com . | Confidencialidad: Si Ud. no es el destinatario y recibe este mail/fax por error, rogamos se ponga en contacto con nosotros y destruya de inmediato el mail/fax por error recibido con todos sus documentos adjuntos sin leerlos ni hacer ningún uso de los datos que en ellos figuren, ateniéndose a las consecuencias que de un uso indebido de dichos datos puedan derivarse.</p>
                        </div>
                    </body>
                </html>`,
      };

      transporter.sendMail(mailData, function(err, info) {
        if (!err) {
          res.status(200).send({ status: "success" });
        } else {
          res.status(500).send({
            status: "error",
            error: "ERROR No se ha podido mandar el mensaje.",
          });
        }
      });
    } else {
      res.status(500).send({
        status: "error",
        error: "ERROR al conectar a smtp en el reenvío al usuario.",
      });
    }
  });
};

const sendEmail = (body, res) => {
  const transporter = nodemailer.createTransport(transport);
  transporter.verify(function(err, success) {
    if (!err) {
      const mailData = {
        from: body.email,
        to: "comercial@macroconcesionario.com",
        repplyTo: body.email,
        subject: "¡Correo recibido! - Macroconcesionario",
        attachments: [
          {
            filename: "logo.png",
            path: imgPath + "logo.png",
            cid: "logo",
          },
          {
            filename: body.img || "coches-electricos-online.webp",
            path: imgPath + "coches-electricos-online.webp",
            cid: "img",
          },
        ],
        html: `<html>
                        <head>
                            <style>
                                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
                                img {
                                    max-width: 100%;
                                    object-fit: cover
                                }
                            </style>
                        </head>
                        <body style='font-family: Roboto'>
                            <div style='width:80%;margin:auto;margin-top:40px;padding:20px 40px;border-color:lightgray;border-width:0 1px;border-style:solid'>
                                <h1 style='text-align:center;color:rgb(129,23,19)'>Macroconcesionario</h1>
                                <div style='margin:auto;text-align:center'>
                                    <img src='cid:img' style='height:200px;'/>
                                </div>
                                <h2 style='text-align:center;color:rgb(70,70,96)'>Mensaje recibido a través del formulario de contacto completo</h2>                                
                                <br>
                               
                                <p style='color:rgb(70,70,96)'>Nombre: <b>${body.username}</b></p>
                                <p style='color:rgb(70,70,96)'>Email: <b>${body.email}</b></p>
                                <p style='color:rgb(70,70,96)'>Telefono: <b>${body.phone}</b></p>
                                <p style='color:rgb(70,70,96)'>Coche: <b>${body.car}</b></p>
                                <p style='color:rgb(70,70,96)'>Viene de: <b>${body.origin}</b></p>
                                <p style='color:rgb(70,70,96)'>Comentario: <b>${body.description}</b></p>
                                <br>
                                <div style='margin:auto;text-align:right'>
                                    <img src='cid:logo' style='width:150px;'/>
                                </div>
                                <br><br>
                                <p style='color:rgb(140,140,140)'><b>Teléfono : 900 533 961</b></p>
                            <br>
                            <p style='color:rgb(140,140,140);font-size:7px'>Responsable : Soluciones Eteaga SL / info@macroconcesionario.com  principal: Gestionar la relación comercial/profesional. Atender las consultas o remitir la información que nos solicita. Proceder al envío de comunicaciones comerciales por medios electrónicos. | Derechos: Acceso, rectificación, supresión y portabilidad de sus datos, de limitación y oposición a su tratamiento, así como a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado de sus datos, cuando procedan. Información adicional: Puede consultar la información adicional y detallada sobre nuestra política de privacidad en https://macroconcesionario.com/aviso-legal o escribiendo al correo electrónico dptojuridico@macroconcesionario.com . | Confidencialidad: Si Ud. no es el destinatario y recibe este mail/fax por error, rogamos se ponga en contacto con nosotros y destruya de inmediato el mail/fax por error recibido con todos sus documentos adjuntos sin leerlos ni hacer ningún uso de los datos que en ellos figuren, ateniéndose a las consecuencias que de un uso indebido de dichos datos puedan derivarse.</p>
                            </div>
                        </body>
                    </html>`,
      };

      //Adjuntamos los ficheros subidos por el usuario
      body.pdf?.forEach((file) => {
        mailData.attachments.push({
          filename: file.name,
          path: file.result,
          contentType: "application/pdf",
        });
      });

      transporter.sendMail(mailData, function(err, info) {
        if (err) {
          res.status(500).send({
            status: "error",
            error: "ERROR No se ha podido mandar el mensaje.",
            err,
          });
        } else {
          sendConfirmationEmail(body, res);
        }
      });
    } else {
      res
        .status(500)
        .send({ status: "error", error: "ERROR al conectar a smtp.", err });
    }
  });
};

const verifyToken = async (body, res) => {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.token}`,
      { method: "POST" }
    );
    const data = await response.json();
    if (!data || !data.success) {
      return res
        .status(403)
        .send({ status: "error", error: "ERROR Recaptcha no es válido." });
    } else {
      sendEmail(body, res);
    }
  } catch (err) {
    return res
      .status(403)
      .send({ status: "error", error: "ERROR Recaptcha no es válido." });
  }
};

const getCodePhone = (body) => {
  if (isValidPhoneNumber(body.phone, body.countryCode)) {
    return getCountryCallingCode(body.countryCode);
  }

  return false;
};
