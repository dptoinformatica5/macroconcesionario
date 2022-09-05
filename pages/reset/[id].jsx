import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../utils/axiosInstance";
import { Alert } from "react-bootstrap";

export default function Reset() {
  const router = useRouter();
  const user = useSelector((state) => state.userReducer);
  const [state, setState] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: null, message: null });

  useEffect(() => user.accessToken && router.back(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      setError({ status: null, message: null });
      setIsLoading(true);
      try {
        await axios.post(`user/${router.query.id}`, {
          password: state.password,
        });
        setError({
          status: "success",
          message:
            "Tu contraseña se ha actualizado! En breve se te redigirá a la página de login.",
        });
        setTimeout(() => router.push("/login"), 3000);
      } catch (error) {
        const { message } = error.response.data;
        setError({ status: "error", message });
      }
      setIsLoading(false);
    } else {
      setError({
        status: "error",
        message:
          "Las contraseñas no coinciden. Por favor, introduzca la misma contraseña en los dos campos.",
      });
    }
  };

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  return (
    <>
      <Head>
        <title>
          Cambiar contraseña | Macroconcesionario: Macroconcesionario |
          macroconcesionario.com
        </title>
      </Head>

      <div className="container">
        <section
          className="login-section p-5 mx-auto"
          style={{ maxWidth: "800px" }}
        >
          <h1 className="title-red">Cambiar contraseña</h1>
          {/* <p>Aún no está disponible. En breve estará funcionando correctamente, disculpe las molestias.</p> */}
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={state.password}
                  onChange={(e) => handleChange(e)}
                  placeholder="Contraseña"
                  minLength="8"
                  required
                />
                <label htmlFor="password">Contraseña</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={state.confirmPassword}
                  onChange={(e) => handleChange(e)}
                  placeholder="Confirmar contraseña"
                  minLength="8"
                  required
                />
                <label htmlFor="password">Confirmar contraseña</label>
              </div>

              <button type="submit" className="g-recaptcha">
                {!isLoading ? (
                  <span>Cambiar contraseña</span>
                ) : (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </button>
            </form>

            {error.status && (
              <Alert
                className="mt-4"
                variant={error.status === "error" ? "danger" : "success"}
              >
                {error.message}
              </Alert>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
