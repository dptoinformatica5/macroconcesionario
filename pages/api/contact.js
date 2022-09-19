let nodemailer = require("nodemailer");
const {
  isValidPhoneNumber,
  getCountryCallingCode,
} = require("libphonenumber-js");
require("dotenv").config();

const imgPath = "http://cdn.cocheselectricosonline.eu/img/";
const transport = {
  host: "mail.macroconcesionario.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_KEY,
  },
};

export default function contact(req, res) {
  const { body } = req;
  verifyToken(body, res);
}

const sendConfirmationEmail = (body, res) => {
  const transporter = nodemailer.createTransport(transport);
  transporter.verify(function(error, success) {
    if (!error) {
      const mailData = {
        from: "info@macroconcesionario.com",
        to: body.email,
        repplyTo: "info@macroconcesionario.com",
        subject: "¡Correo recibido! - Macroconcesionario",
        attachments: [
          {
            filename: "logo1.png",
            path: imgPath + "logo1.png",
            cid: "logo",
          },
          {
            filename: "sonnen_black.png",
            path: imgPath + "sonnen_black.png",
            cid: "sonnenstromfabrik",
          },
          {
            filename: body.img || "comprar-coches-de-combustion.webp",
            path:
              body.imageFormatted ||
              imgPath + "comprar-coches-de-combustion.webp",
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
                            <h1 style='text-align:center;color:rgb(255,179,26)'>Macroconcesionario</h1>
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
                            <p style='color:rgb(140,140,140)'><b>Teléfono : 910 05 36 06</b></p>
                            <br>
                            <p style='color:rgb(140,140,140);font-size:7px'>Responsable : Soluciones Eteaga SL / info@macroconcesionario.com principal: Gestionar la relación comercial/profesional. Atender las consultas o remitir la información que nos solicita. Proceder al envío de comunicaciones comerciales por medios electrónicos. | Derechos: Acceso, rectificación, supresión y portabilidad de sus datos, de limitación y oposición a su tratamiento, así como a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado de sus datos, cuando procedan. Información adicional: Puede consultar la información adicional y detallada sobre nuestra política de privacidad en https://macroconcesionario.com/aviso-legal o escribiendo al correo electrónico comercial@macroconcesionario.com. | Confidencialidad: Si Ud. no es el destinatario y recibe este mail/fax por error, rogamos se ponga en contacto con nosotros y destruya de inmediato el mail/fax por error recibido con todos sus documentos adjuntos sin leerlos ni hacer ningún uso de los datos que en ellos figuren, ateniéndose a las consecuencias que de un uso indebido de dichos datos puedan derivarse.</p>
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
  //si hay customerCode el cliente ya existe
  const { customerCode } = body;

  const codeNumber = getCodePhone(body);
  if (codeNumber) {
    const sendInfoNewCustomer = `<div>
        <h2 style="text-align:center;color:rgb(70,70,96)">
          Mensaje recibido a través del formulario de contacto: Nuevo Cliente
        </h2>
        <br></br>
        <p style="color:rgb(70,70,96)">
          Nombre: <b>${body.name}</b>
        </p>
        <p style="color:rgb(70,70,96)">
          DNI: <b>${body.dni}</b>
        </p>
        <p style="color:rgb(70,70,96)">
          Email: <b>${body.email}</b>
        </p>
        <p style="color:rgb(70,70,96)">
          Telefono:<b>
            +${codeNumber} ${body.phone}
          </b>
        </p>
        <p style="color:rgb(70,70,96)">
          Mensaje: <b>${body.message}</b>
        </p>
      </div>`;
    const sendInfoCustomer = ` <div>
        <h2 style="text-align:center;color:rgb(70,70,96)">
          Mensaje recibido a través del formulario de contacto: Cliente
          Registrado
        </h2>
        <br></br>
        <p style="color:rgb(70,70,96)">
          Número de Cliente: <b>${body.customerCode}</b>
        </p>
      </div>`;
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
              filename: "logo1.png",
              path: imgPath + "logo1.png",
              cid: "logo",
            },
            {
              filename: body.img || "comprar-coches-de-combustion.webp",
              path:
                body.imageFormatted ||
                imgPath + "comprar-coches-de-combustion.webp",
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
                                <h1 style='text-align:center;color:rgb(255,179,26)'>Macroconcesionario</h1>
                                <div style='margin:auto;text-align:center'>
                                    <img src='cid:img' style='height:200px;'/>
                                </div>                             
                               
                                ${
                                  customerCode
                                    ? sendInfoCustomer
                                    : sendInfoNewCustomer
                                }
                                <br>
                                <div style='margin:auto;text-align:right'>
                                    <img src='cid:logo' style='width:150px;'/>
                                </div>
                                <br><br>
                                <div class='separator' style='height:1px;border-color:lightgray;border-style:dotted;border-width:2px 0 0 0;'></div>
                                  <p style='color:rgb(140,140,140);font-size:7px'>Responsable : Soluciones Eteaga SL / info@macroconcesionario.com principal: Gestionar la relación comercial/profesional. Atender las consultas o remitir la información que nos solicita. Proceder al envío de comunicaciones comerciales por medios electrónicos. | Derechos: Acceso, rectificación, supresión y portabilidad de sus datos, de limitación y oposición a su tratamiento, así como a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado de sus datos, cuando procedan. Información adicional: Puede consultar la información adicional y detallada sobre nuestra política de privacidad en https://macroconcesionario.com/aviso-legal o escribiendo al correo electrónico comercial@macroconcesionario.com. | Confidencialidad: Si Ud. no es el destinatario y recibe este mail/fax por error, rogamos se ponga en contacto con nosotros y destruya de inmediato el mail/fax por error recibido con todos sus documentos adjuntos sin leerlos ni hacer ningún uso de los datos que en ellos figuren, ateniéndose a las consecuencias que de un uso indebido de dichos datos puedan derivarse.</p>
                            </div>
                        </body>
                    </html>`,
        };

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
  } else {
    res.status(500).send({
      status: "error",
      error:
        "¡El teléfono no es válido! Asegúrese de que la región escogida corresponda al teléfono introducido.",
    });
  }
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
