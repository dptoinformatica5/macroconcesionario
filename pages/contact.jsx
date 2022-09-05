import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactForm from "../components/ContactForm";
import { useDispatch } from "react-redux";
import { resetSelectedVehicle } from "../redux/actions";
import { renderAlert } from "../utils/helper";
export default function Contact() {
  const dispatch = useDispatch();
  const [emailSent, setEmailSent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (token, state) => {
    localStorage.setItem("vehicle", JSON.stringify(state));
    setIsLoading(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...state, token }),
    }).then((res) => res.json());

    setEmailSent(res);
  };

  useEffect(() => {
    if (emailSent) {
      setIsLoading(false);
      if (emailSent.status === "success") {
        dispatch(resetSelectedVehicle());
      }
    }
  }, [emailSent]);

  return (
    <>
      <Head>
        <title>
          Contacto | Macroconcesionario: Macroconcesionario |
          macroconcesionario.com
        </title>
        <meta
          name="description"
          content="Página de contacto sobre Macroconcesionario en España y Europa"
        />
      </Head>

      <div className="container pt-4">
        {isLoading === false && emailSent && renderAlert(emailSent, router)}

        <section className="section_contact-form">
          <h2 className="text-center">¿Estás interesado en algún vehículo?</h2>
          <p className="my-4 text-center">
            Nuestro departamento comercial estará encantado de atenderte y
            asesorarte en cualquier cuestión relacionada con la compra; modelos
            disponibles, parámetros técnicos o la instalación de un punto de
            recarga. Infórmate sin compromiso.
          </p>
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
          >
            <ContactForm handleSubmit={handleSubmit} isLoading={isLoading} />
          </GoogleReCaptchaProvider>
        </section>
      </div>
    </>
  );
}
