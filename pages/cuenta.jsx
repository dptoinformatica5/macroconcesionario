import Head from "next/head";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import axios from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/actions";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Icon from "../components/Icon";
import router from "next/router";

export default function Cuenta() {
  const user = useSelector((state) => state.userReducer);
  const [state, setState] = useState({ name: user.name, email: user.email });
  const [checked, setChecked] = useState(user.notification_comment);
  const [readOnly, setReadOnly] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalDeleteAccount, setShowModalDeleteAccount] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => !user.accessToken && router.push("/login"), []);

  useEffect(
    () => readOnly && setState({ name: user.name, email: user.email }),
    [readOnly]
  );

  useEffect(() => {
    if (showModal) setTimeout(() => setShowModal(false), 2000);
  }, [showModal]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const actualizarCuenta = async () => {
    setError(null);
    if (
      user.name !== state.name ||
      user.email !== state.email ||
      user.notification_comment !== checked
    ) {
      try {
        const { data } = await axios.put(`user/${user._id}`, {
          ...state,
          notification_comment: checked,
          googleUser: user.googleUser,
        });
        setState(data);
        dispatch(login(data));
        setShowModal(true);
      } catch (error) {
        console.log(error);
        let errorName = error.response.data.name;
        if (errorName)
          errorName =
            "El nombre de usuario ya existe, intente poner uno distinto.";
        setError(
          error.response.data.password ||
            error.response.data.email ||
            error.response.data.duplicate ||
            errorName
        );
      } finally {
        setDisabled(false);
      }
    }
  };

  const eliminarCuenta = async () => {
    try {
      setDisabled(true);
      await axios.post(`delete-user/${user._id}`, {
        googleUser: user.googleUser,
      });

      const { refreshToken } = user;
      await axios.post("logout", { user_id: user._id, refreshToken });
      dispatch(logout());
      if (user.googleUser) {
        const auth2 = gapi.auth2.getAuthInstance();
        if (auth2 != null) auth2.signOut().then(auth2.disconnect());
      }
    } catch (error) {
      //console.log(error);
    } finally {
      setDisabled(false);
      return router.push("/login");
    }
  };

  const renderModal = () => (
    <Rodal visible={showModal} onClose={() => setShowModal(false)}>
      <div className="text-center">
        <h2>Cuenta actualizada</h2>
        <div className="icon-success m-0">
          <Icon icon={"check-circle"} color="darkgreen" />
        </div>
      </div>
    </Rodal>
  );

  const renderDeleteAccount = () => (
    <Rodal
      visible={showModalDeleteAccount}
      onClose={() => setShowModalDeleteAccount(false)}
    >
      <div className="text-center">
        <h2 className="pt-4">¿Está seguro de eliminar su cuenta?</h2>
        <div className="icon-success m-0" style={{ fontSize: "5rem" }}>
          <Icon icon={"exclamation-circle"} color="darkred" />
        </div>
        <p className="pt-2">
          Una vez elimine su cuenta perderá todos sus datos.
        </p>
        <div className="w-100 d-flex justify-content-between flex-wrap mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => setShowModalDeleteAccount(false)}
          >
            Cancelar
          </button>
          <button
            className="btn btn-danger"
            onClick={eliminarCuenta}
            disabled={disabled}
          >
            Eliminar
          </button>
        </div>
      </div>
    </Rodal>
  );

  return (
    <>
      <Head>
        <title>
          Mi cuenta | Macroconcesionario: Macroconcesionario |
          macroconcesionario.com
        </title>
        <meta
          name="description"
          content="Editar mi cuenta de Macroconcesionario"
        />
      </Head>

      <div className="container pt-4">
        <section
          id="section__top-vehicles"
          className="section__top-vehicles my-4 mw800"
        >
          <h1 className="title-red">Datos de mi cuenta</h1>
          <form className="w-100">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="name"
                value={state.name}
                onChange={(e) => handleChange(e)}
                placeholder="Usuario"
                readOnly={readOnly}
                required
              />
              <label htmlFor="title">Usuario</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="email"
                value={state.email}
                onChange={(e) => handleChange(e)}
                placeholder="Email"
                readOnly={readOnly}
                required
              />
              <label htmlFor="title">Email</label>
            </div>

            <div className="form-floating mb-4">
              <div className="form-check d-flex align-items-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="checkBox"
                  checked={checked}
                  disabled={readOnly}
                  onChange={() => setChecked((prev) => !prev)}
                />
                <label className="form-check-label" htmlFor="checkBox">
                  Recibir notificaciones de nuevos comentarios
                </label>
              </div>
            </div>

            {error && <p className="error">{`Error: ${error}`}</p>}
          </form>

          <div className="d-flex">
            <Button
              text={readOnly ? "Editar" : "Cancelar"}
              customClass={`btn ${
                readOnly ? "btn-warning" : "btn-danger"
              } mx-2`}
              onClick={() => setReadOnly((prev) => !prev)}
            />
            {!readOnly && (
              <Button
                text={"Actualizar"}
                customClass={`btn btn-success mx-2`}
                onClick={actualizarCuenta}
                disabled={disabled}
              />
            )}
          </div>

          <div style={{ margin: "5rem 0 0 auto" }}>
            <Button
              text="Eliminar cuenta"
              customClass="btn btn-danger"
              onClick={() => setShowModalDeleteAccount((prev) => !prev)}
            />
          </div>
        </section>
      </div>

      {showModal && renderModal()}
      {showModalDeleteAccount && renderDeleteAccount()}
    </>
  );
}
