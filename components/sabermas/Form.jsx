import React, { useEffect, useState, useCallback } from "react";
import styles from "../../styles/Sabermas.module.css";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
const Form = ({ state, setState, initialState }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleInputChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    setIsLoading(true);
    const token = await handleReCaptchaVerify();
    const res = await fetch("/api/sabermas", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state, token }),
    })
      .then((res) => {
        setIsLoading(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        return res.json();
      })
      .catch((e) => console.log(e));
    setState(initialState);
  };
  //Google Recaptcha
  const handleReCaptchaVerify = useCallback(async () => {
    if (executeRecaptcha) {
      return await executeRecaptcha();
    } else {
      return;
    }
  }, [executeRecaptcha]);
  useEffect(() => handleReCaptchaVerify, [handleReCaptchaVerify]);

  return (
    <>
      <form action="POST" onSubmit={handleSubmit} className={styles.formulario}>
        <input
          type="text"
          name="customer"
          value={state.customer}
          placeholder="Nombre y Apellido"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={state.phone}
          onChange={handleInputChange}
          required
        />
        <div className={styles.checkboxes}>
          <label htmlFor="politica">
            <input type="checkbox" id="politica" required />
            Acepto la Política de Privacidad de Macroconcesionario
          </label>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className={styles.btnFormSabermas}>
            {!isLoading ? (
              <span>Enviar</span>
            ) : (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only"></span>
              </div>
            )}
          </button>
        </div>
      </form>
      {showAlert && (
        <div className="alert alert-success mt-4">
          Hemos recibido su correo correctamente. Nos pondremos en contacto con
          usted lo antes posible.
        </div>
      )}
    </>
  );
};

export default Form;
