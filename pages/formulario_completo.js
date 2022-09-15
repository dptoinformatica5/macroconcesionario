import React, { useState } from "react";
import ContactFormPDF from "../components/ContactFormPDF";
import Head from "next/head";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function Formulario_completo() {
  return (
    <>
      <Head>
        <title>
          Contacto | Macroconcesionario: Macroconcesionario |
          macroconcesionario.com
        </title>
        <meta
          name="description"
          content="Página de contacto de Macroconcesionario en España y Europa"
        />
      </Head>

      <div className="container">
        <section className="section_contact-form">
          <h2 className="text-center">Fomulario de Contacto</h2>
          <p className="my-4 text-justify">
            Nuestro departamento comercial estará encantado de atenderte y
            asesorarte en cualquier cuestión relacionada con la compra; modelos
            disponibles, parámetros técnicos o la instalación de un punto de
            recarga. Infórmate sin compromiso.
          </p>
          <h6 className="text-center">
            **Para agilizar el proceso, por favor adjunta tu Documento de
            Identidad.
          </h6>
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
          >
            <ContactFormPDF />
          </GoogleReCaptchaProvider>
        </section>
      </div>
    </>
  );
}
