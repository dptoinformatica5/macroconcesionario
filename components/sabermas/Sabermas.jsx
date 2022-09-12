import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import styles from "../../styles/Sabermas.module.css";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Form from "./Form";

const Sabermas = () => {
  const initialState = {
    customer: "",
    phone: "",
  };
  const [state, setState] = useState(initialState);

  return (
    <div className={` ${styles.container} ${styles.sabermas}`}>
      <div className="row">
        <div className="col-12 col-md-3 text-center">
          <h2>¿Tienes alguna duda?</h2>
          <p>Rellena el formulario y un agente te llamará gratis. </p>
        </div>
        <div className="col-12 col-md-6 col-lg-5">
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
          >
            <Form
              state={state}
              setState={setState}
              initialState={initialState}
            />
          </GoogleReCaptchaProvider>
        </div>
        <div className={`${styles.llamanos} col-12 col-md-3 `}>
          <p>También puedes contactarnos gratis al:</p>
          <span>910 05 36 06</span>
          <p>
            Nuestro horario de atención es de lunes a viernes de 8:30 a 16:30
          </p>
        </div>
      </div>
      <div className={styles.legal}>
        <p>
          *Soluciones Eteaga S.L.N.E. tratará sus datos con la finalidad de
          responder a sus consultas y solicitudes de información
        </p>
      </div>
    </div>
  );
};

export default Sabermas;
