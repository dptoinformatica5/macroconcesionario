import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import axios from "../utils/axiosInstance";
import { useFetch } from "../components/hooks";
import GoogleAndFacebookLogin from "../components/GoogleAndFacebookLogin";
import AccountBlocked from "../components/modals/AccountBlocked";

export default function Login() {
  const router = useRouter();
  const [state, setState] = useState({ email: "", password: "" });
  const [disabled, setDisabled] = useState(true);
  const [activate, setActivate] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [isLoading, startFetch, error, data] = useFetch();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const { email, password } = state;
    email && password ? setDisabled(false) : setDisabled(true);
  }, [state]);

  useEffect(() => {
    if (error) return setActivate(false);

    if (data) {
      if (data.status === "active") {
        dispatch(login(data));
        return router.push("/");
      }
      if (data.status === "blocked") {
        return setShowModal(true);
      }

      setActivate(true);
    }
  }, [data, error]);

  const handleChange = (e) => {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const resend = async () => {
    setResendSuccess(null);
    setIsResendLoading(true);
    const { email } = data;
    if (email) {
      try {
        await axios.post("resend-activate", { email });
        setIsResendLoading(false);
        setResendSuccess(true);
        setActivate(false);
      } catch (error) {
        setIsResendLoading(false);
        console.log(error.response.data);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResendSuccess(null);
    await startFetch("login", state, "post");
  };

  const renderActivate = () => {
    if (activate && !error) {
      return (
        <div className="error">
          La cuenta no está activada. Si no le ha llegado el correo para
          activarla o no lo encuentra, puede volver a solicitarlo{" "}
          <span
            style={{
              color: "black",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={resend}
          >
            aquí.
          </span>
          &nbsp;
          {isResendLoading && (
            <div
              className="spinner-border spinner-border-sm text-dark"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <Head>
        <title>
          Accede a tu cuenta | Macroconcesionario: Macroconcesionario |
          macroconcesionario.com
        </title>
        <meta
          name="description"
          content="Iniciar Sesión - Macroconcesionario"
        />
      </Head>

      <div className="container d-flex justify-content-center align-items-center">
        <section
          className="login-section p-5 w-100"
          style={{ maxWidth: "800px" }}
        >
          <h1 className="title-red">Iniciar sesión</h1>

          <GoogleAndFacebookLogin />

          <div className="form_wrapper pt-5">
            <form onSubmit={handleSubmit}>
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

              {error && <p className="error">{`Error: ${error.error}`}</p>}
              {renderActivate()}
              {resendSuccess && (
                <p className="text-success">
                  Hemos vuelto a enviar un correo de activación de cuenta al
                  email indicado anteriormente.
                </p>
              )}

              <p className="my-4">
                <Link href="/recovery-password">
                  <a>He olvidado mi contraseña</a>
                </Link>
              </p>

              <button type="submit" className="g-recaptcha" disabled={disabled}>
                {!isLoading ? (
                  <>
                    <span>Iniciar sesión</span>
                    <FontAwesomeIcon
                      icon={faSignInAlt}
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
            <p className="text-center fw-bold">¿Eres nuevo?</p>
            <div className="d-flex justify-content-center">
              <Link href="/registro">
                <a>
                  <button className="btn-contact m-auto">Crear cuenta</button>
                </a>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <AccountBlocked showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
