import { useRouter } from "next/router";
import axios from "../utils/axiosInstance";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import { Alert } from "react-bootstrap";

export default function RecoveryPassword() {
  const router = useRouter();
  const user = useSelector((state) => state.userReducer);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: null, message: null });

  useEffect(() => user.accessToken && router.back(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ status: null, message: null });
    setIsLoading(true);
    try {
      const { data } = await axios.post("recovery-password", { email });
      setError(data);
    } catch (error) {
      setError(error.response.data);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>
          Recuperar contraseña | Macroconcesionario: Macroconcesionario |
          macroconcesionario.com
        </title>
      </Head>

      <div className="container">
        <section
          className="login-section p-5 mx-auto"
          style={{ maxWidth: "800px" }}
        >
          <h1 className="title-red">Recuperar contraseña</h1>
          <p className="my-4">
            Introduce el e-mail asociado a tu cuenta de CochesElectricosOnline y
            te enviaremos un enlace para restaurar tu contraseña.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <button type="submit" className="g-recaptcha">
              {!isLoading ? (
                <span>Recuperar contraseña</span>
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

          <div className="text-center mt-4">
            <Link href="/login">Volver a iniciar sesión</Link>
          </div>
        </section>
      </div>
    </>
  );
}
