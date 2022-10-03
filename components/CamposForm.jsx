import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { Alert } from "react-bootstrap";
import { useFetch, useRecaptcha } from "../components/hooks";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function CamposForm() {
  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
      >
        <RegistroComponent />
      </GoogleReCaptchaProvider>
    </>
  );
}

const RegistroComponent = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, startFetch, error, data] = useFetch();
  const { verifyRecaptcha } = useRecaptcha();

  useEffect(() => {
    const { name, email, password, confirm_password } = state;
    if (
      name &&
      email &&
      password &&
      confirm_password &&
      checked &&
      password === confirm_password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [state, checked]);

  useEffect(() => data && setShowModal(true), [data]);
  useEffect(() => (isLoading ? setDisabled(true) : setDisabled(false)), [
    isLoading,
  ]);

  const handleChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);
    const verify = await verifyRecaptcha();
    if (verify.status === true) await startFetch("register", state, "post");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <section
        className="login-section p-5 w-100"
        style={{ maxWidth: "800px" }}
      >
        {/*<h1 className="title-red">Crear cuenta</h1>*/}
        <div className="form_wrapper pt-4">
          {/* <small className="small-bold-gray">
                        * Por su seguridad, NO introduzca su nombre completo.
                    </small> */}
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                value={state.name}
                onChange={(e) => handleChange(e)}
                name="name"
                placeholder="Usuario"
                required
              />
              <label htmlFor="name">Usuario</label>
            </div>
            {error && error.name && (
              <p className="error">{`Error: El nombre de usuario ya existe, intente poner uno distinto.`}</p>
            )}

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                value={state.email}
                onChange={(e) => handleChange(e)}
                placeholder="Email"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            {error && error.email && (
              <p className="error">{`Error: ${error.email}`}</p>
            )}

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                value={state.password}
                onChange={(e) => handleChange(e)}
                placeholder="Contraseña"
                required
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            {error && error.password && (
              <p className="error">{`Error: ${error.password}`}</p>
            )}

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                value={state.confirm_password}
                onChange={(e) => handleChange(e)}
                placeholder="Repetir contraseña"
                required
              />
              <label htmlFor="confirm_password">Repetir contraseña</label>
            </div>

            <div className="form-floating mb-4">
              <div className="form-check d-flex align-items-center"></div>
            </div>

            <button type="submit" className="g-recaptcha" disabled={disabled}>
              {!isLoading ? (
                <>
                  <span>Agregar Coche</span>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    style={{ marginLeft: "10px" }}
                  />
                </>
              ) : (
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </button>
          </form>

          <hr className="my-4" />
        </div>
      </section>
    </div>
  );
};
