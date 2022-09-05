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
                    <h2>¿Quieres que te llamemos?</h2>
                    <p>Déjanos tus datos y un asesor te llamará pronto.</p>
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
                    <p>
                        Si lo prefieres puedes llamarnos gratis sin compromiso.
                    </p>
                    <span>900 533 961</span>
                    <p>Te atenderemos de lunes a viernes de 8:30 a 16:30</p>
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