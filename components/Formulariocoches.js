import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { Alert } from "react-bootstrap";
import { useFetch, useRecaptcha } from "../components/hooks";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import PasarImg from "./PasarImg";

export default function Formulariocoches() {
  return (
    <>
      <Head>
        <title>
          Crear Cuenta | Macroconcesionario: Macroconcesionario |
          macroconcesionario.com
        </title>
        <meta
          name="description"
          content="Registro en cocheselectricosonline."
        />
      </Head>

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
        <h1 className="title-red">Agregar Nuevo Coche</h1>
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
              <label htmlFor="name">Nombre del Vehículo</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                value={state.marca}
                onChange={(e) => handleChange(e)}
                name="marca"
                placeholder="Marca"
                required
              />
              <label htmlFor="name">Marca</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="numero"
                className="form-control"
                value={state.autonomia}
                onChange={(e) => handleChange(e)}
                name="autonomia"
                placeholder="Autonomia"
                required
              />
              <label htmlFor="name">Autonomía</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="numero"
                className="form-control"
                value={state.potencia}
                onChange={(e) => handleChange(e)}
                name="potencia"
                placeholder="Potencia"
                required
              />
              <label htmlFor="name">Potencia/Velocidad</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="numero"
                className="form-control"
                value={state.precio}
                onChange={(e) => handleChange(e)}
                name="precio"
                placeholder="Precio"
                required
              />
              <label htmlFor="name">Precio</label>
            </div>

            <div className="input-group">
              <p>Adjuntar imagen del coche</p>
            </div>

            <div className="input-group mb-3">
              <input
                type="file"
                className="form-control"
                required
                onChange={null}
                name="imgFile"
                multiple
              />
            </div>

            <button type="submit" className="g-recaptcha" disabled={disabled}>
              {!isLoading ? (
                <>
                  <span>Agregar Coche</span>
                </>
              ) : (
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
