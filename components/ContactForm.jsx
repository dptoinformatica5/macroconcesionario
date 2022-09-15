import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import CountryCodes from "../assets/countryCodes.json";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { checkDni, validateEmail } from "../utils/helper";

export default function ContactForm({ handleSubmit, isLoading }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const selectedVehicle = useSelector((state) => state.vehicleReducer);
  const [disabled, setDisabled] = useState(true);
  const [formatDni, setFormatDni] = useState(true);
  const [formatEmail, setFormatEmail] = useState(true);
  const initialState = {
    name: "",
    email: "",
    countryCode: "ES",
    phone: "",
    message: "",
    dni: "",
    customerCode: "",
  };
  const [state, setState] = useState(initialState);
  const [isCustomer, setIsCustomer] = useState(null);
  //Google Recaptcha
  const handleReCaptchaVerify = useCallback(async () => {
    if (executeRecaptcha) {
      return await executeRecaptcha();
    } else {
      return;
    }
  }, [executeRecaptcha]);

  useEffect(() => handleReCaptchaVerify, [handleReCaptchaVerify]);
  useEffect(() => {
    const getClientCountry = async () => {
      const clientCountry = await fetch("https://ipapi.co/json/")
        .then((data) => data.json())
        .then((data) => data.country);
      if (clientCountry)
        setState((prev) => {
          return { ...prev, countryCode: clientCountry };
        });
    };

    getClientCountry();
  }, []);
  useEffect(() => {
    if (selectedVehicle) {
      let message = selectedVehicle.vehicle_name
        ? `Buenas, estoy interesado en el vehículo ${selectedVehicle.vehicle_name}.`
        : "Escribe tu mensaje...";

      setState((prevState) => {
        return {
          ...prevState,
          ...selectedVehicle,
          message,
        };
      });
    }
  }, [selectedVehicle]);

  //Buton formulario desabilitaodo
  useEffect(() => {
    //si no ha ingreado un codigo
    if (state.customerCode === "") {
      const { name, email, dni, countryCode, phone, message } = state;
      if (
        name &&
        email &&
        dni &&
        countryCode &&
        phone &&
        message &&
        formatDni
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(false);
    }
  }, [state]);

  const handleChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const contactSubmit = async (e) => {
    e.preventDefault();
    const token = await handleReCaptchaVerify();
    if (state.customerCode !== "") {
      //se manda estructura por defecto
      const customerState = {
        name: "cliente registrado",
        email: "comercial@macroconcesionario.com",
        countryCode: "ES",
        phone: "600000000",
        message: "Ya soy cliente",
        dni: "000000000",
        customerCode: state.customerCode,
      };
      await handleSubmit(token, customerState);
    } else {
      await handleSubmit(token, state);
    }
    setState(initialState);
  };
  const renderOptions = () => {
    const regiones = getCountries();
    return regiones.map((r, i) => {
      const code = getCountryCallingCode(r);
      const country = CountryCodes[r];
      if (country) {
        return (
          <option key={i} value={r}>{`${r} (${country} +${code})`}</option>
        );
      }
    });
  };
  const checkCustomer = (curState) => {
    curState ? setIsCustomer(true) : setIsCustomer(false);
  };

  const contactFormNewCustomer = (
    <>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          value={state.name}
          onChange={(e) => handleChange(e)}
          placeholder="Name"
          name="name"
          required
        />
        <label htmlFor="name">Nombre Completo</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          value={state.dni}
          onChange={(e) => {
            handleChange(e);
            setFormatDni(checkDni(e.target.value));
          }}
          placeholder="DNI"
          name="dni"
          minLength={"9"}
          maxLength={"9"}
          // required
        />
        <label htmlFor="dni">DNI</label>
        {formatDni ? null : (
          <strong style={{ color: "red" }}>Ingresa un DNI válido.</strong>
        )}
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          name="email"
          value={state.email}
          onChange={(e) => {
            handleChange(e);
            setFormatEmail(validateEmail(e.target.value));
          }}
          placeholder="name@example.com"
          required
        />
        <label htmlFor="email">Email</label>
        {formatEmail ? null : (
          <strong style={{ color: "red" }}>Ingresa un Email válido.</strong>
        )}
      </div>

      <select
        className="form-select mb-3"
        name="countryCode"
        value={state.countryCode}
        onChange={(e) => handleChange(e)}
        required
      >
        {renderOptions()}
      </select>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          name="phone"
          value={state.phone}
          onChange={(e) => handleChange(e)}
          placeholder="Phone"
          minLength={9}
          required
        />
        <label htmlFor="phone">Teléfono</label>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          name="message"
          placeholder="Mensaje..."
          value={state.message}
          onChange={(e) => handleChange(e)}
          style={{ height: "100px" }}
          required
        ></textarea>
        <label htmlFor="message">Mensaje</label>
      </div>

      <label htmlFor="legal" className="m-4">
        <input
          type="checkbox"
          id="legal"
          name="legal"
          className="me-1"
          required
        />
        Acepto el Aviso
        <a
          href="https://macroconcesionario.com/aviso-legal"
          target={"_blank"}
          rel="noreferrer"
        >
          {" "}
          Legal y Política de Privacidad
        </a>
      </label>

      <button type="submit" className="g-recaptcha" disabled={disabled}>
        {!isLoading ? (
          <>
            <span>ENVIAR</span>
            <FontAwesomeIcon
              icon={faShareSquare}
              style={{ marginLeft: "10px" }}
            />
          </>
        ) : (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </button>
    </>
  );

  const contactFormCustomer = (
    <>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          value={state.customerCode}
          placeholder="Número de Cliente"
          name="customerCode"
          onChange={(e) => handleChange(e)}
          // required
        />
        <label htmlFor="name">Número de Cliente</label>
      </div>

      <label htmlFor="legal" className="m-4">
        <input
          type="checkbox"
          id="legal"
          name="legal"
          className="me-1"
          required
        />
        Acepto el Aviso
        <a
          href="https://macroconcesionario.com/aviso-legal"
          target={"_blank"}
          rel="noreferrer"
        >
          {" "}
          Legal y Política de Privacidad
        </a>
      </label>

      <button
        type="submit"
        id="btn-submit-contactCustomer"
        className="g-recaptcha"
        disabled={disabled}
      >
        {!isLoading ? (
          <>
            <span>ENVIAR</span>
            <FontAwesomeIcon
              icon={faShareSquare}
              style={{ marginLeft: "10px" }}
            />
          </>
        ) : (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </button>
    </>
  );
  return (
    <>
      {selectedVehicle.vehicle_name && (
        <table className="table table-bordered mb-4">
          <thead>
            <tr>
              <th scope="col">Vehículo</th>
              <th scope="col">Plazo</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">{selectedVehicle?.vehicle_name}</td>
              <td>{selectedVehicle?.plazoFormatted}</td>
              <td>{selectedVehicle?.precioFormatted}</td>
            </tr>
          </tbody>
        </table>
      )}
      <label
        htmlFor="cliente"
        className="me-4"
        onClick={() => checkCustomer(true)}
      >
        <input type="radio" id="cliente" name="isCustomer" className="me-2" />
        Soy cliente
      </label>

      <label htmlFor="no_cliente" onClick={() => checkCustomer(false)}>
        <input
          type="radio"
          id="no_cliente"
          name="isCustomer"
          className="me-2"
        />
        No soy cliente
      </label>
      <div className="form_wrapper">
        {isCustomer === null ? (
          ""
        ) : (
          <form onSubmit={(e) => contactSubmit(e)}>
            {isCustomer ? contactFormCustomer : contactFormNewCustomer}
          </form>
        )}
      </div>
    </>
  );
}
