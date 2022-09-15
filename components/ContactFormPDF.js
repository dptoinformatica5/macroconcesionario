import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/router";
import axios from "axios";
import { renderAlert } from "../utils/helper";
const ContactFormPDF = () => {
  //for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const initialState = {
    username: "",
    email: "",
    phone: "",
    car: "",
    origin: "",
    description: "",
    pdf: "",
    privacidad: "",
  };
  const [state, setState] = useState(initialState);
  const [isLoading, setisLoading] = useState(false);
  const [displayPrivacidad, setDisplayPrivacidad] = useState(false);
  const [displayDniInput, setDisplayDniInput] = useState(false);
  const [emailSent, setEmailSent] = useState(null);
  const router = useRouter();
  //Google Recaptcha
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleReCaptchaVerify = useCallback(async () => {
    if (executeRecaptcha) {
      return await executeRecaptcha();
    } else {
      return;
    }
  }, [executeRecaptcha]);

  //comprobar si un fichero es del tipo correspondiente
  const checkFileType = (file) => {
    const fileType = ["pdf", "image"];
    let result;
    let count = 0;
    for (const type of fileType) {
      result = file.type.includes(type);
      // console.log(result, `${type} es ${file.type}`);
      count = !result ? ++count : count;
      if (count === fileType.length) {
        console.log(
          "length",
          fileType.length,
          "no coincide con los formatos aceptados"
        );
        return false;
      }
    }
    return true;
  };

  //onchange event
  const handlePdfFileChange = (e) => {
    let selectedFiles = e.target.files;
    let fileChecked;
    //Si alguno de los archivos no coincide salta error
    for (let i = 0; i < selectedFiles.length; i++) {
      fileChecked = checkFileType(selectedFiles[i]);
      if (!fileChecked) break;
    }

    if (fileChecked) {
      console.log("fichero correcto");
      var arrFiles = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFiles[i]);
        reader.onloadend = (e) => {
          arrFiles.push({
            result: e.target.result,
            name: selectedFiles[i].name,
          });
        };
      }
      setPdfFileError("");
    } else {
      setPdfFile(null);
      setPdfFileError("Please select valid pdf file");
    }
    setPdfFile(arrFiles);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await handleReCaptchaVerify();

    if (!displayPrivacidad) {
      alert("Debe aceptar la política de privacidad");
      return;
    }

    setisLoading(true);
    if (token && displayPrivacidad) {
      try {
        const { data } = await axios.post("/api/contactpdf", {
          ...state,
          token,
        });
        console.log("axios data", data);
        if (data.status === "success") {
          console.log(data.status);
          setEmailSent(data);
          setState(initialState);
        }
      } catch (error) {
        console.log("Error catch", error);
      }

      setisLoading(false);
    } else {
      console.log("no hay token");
    }
  };
  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleDisplayDniForm = (e) => {
    setDisplayDniInput(!displayDniInput);
    setPdfFile(null);
    setPdfFileError("");
  };
  useEffect(() => {
    setState({ ...state, pdf: pdfFile });
    console.log(pdfFile);
  }, [pdfFile]);
  useEffect(() => handleReCaptchaVerify, [handleReCaptchaVerify]);
  const handleDisplayPrivacidad = (e) => {
    setDisplayPrivacidad(!displayPrivacidad);
  };

  return (
    <div className="d-flex justify-content-center">
      <main className="m-4">
        {isLoading === false && emailSent && renderAlert(emailSent, router)}
        <h3>Formulario contacto</h3>
        <form className="card border p-2" onSubmit={handleSubmit}>
          <div className="w-100">
            <div className=" form-group d-flex flex-wrap flex-md-nowrap gap-1">
              <label htmlFor="name ">
                *Nombre Completo
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  aria-label="Username"
                  name="username"
                  value={state.username}
                  onChange={handleInputs}
                  required
                />
              </label>
              <label htmlFor="phone">
                *Teléfono
                <input
                  id="phone"
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  aria-label="Phone"
                  name="phone"
                  value={state.phone}
                  onChange={handleInputs}
                  required
                />
              </label>
              <label htmlFor="email">
                *Email
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  name="email"
                  value={state.email}
                  onChange={handleInputs}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="car">
                Detalles del vehículo
                <input
                  id="car"
                  type="text"
                  className="form-control"
                  placeholder="Coche y detalles"
                  aria-label="Coche"
                  name="car"
                  value={state.car}
                  onChange={handleInputs}
                />
              </label>
            </div>
          </div>
          <div className="mt-2" onChange={handleInputs}>
            <h6>¿Cómo nos conociste?</h6>
            <label htmlFor="coches.net">
              <input
                type="radio"
                name="origin"
                id="coches.net"
                value="coches.net"
              />{" "}
              coches.net
            </label>
            <label htmlFor="autocasion.com" className="ms-4">
              <input
                type="radio"
                name="origin"
                id="autocasion.com"
                value="autocasion.com"
              />{" "}
              autocasion.com
            </label>
            <label htmlFor="autocasion.com" className="ms-4">
              <input
                type="radio"
                name="origin"
                id="Wallapop"
                value="Wallapop"
              />{" "}
              Wallapop
            </label>
          </div>
          <div className="description">
            <textarea
              name="description"
              id=""
              rows="5"
              value={state.description}
              className="form-control"
              placeholder="Añade un comentario"
              onChange={handleInputs}
            ></textarea>
          </div>

          {/* ADJUNTAR DOCUMENTO */}
          <div>
            <label htmlFor="dniAttached" className="my-2">
              <input
                type="checkbox"
                name="checkdni"
                id="dniAttached"
                onChange={handleDisplayDniForm}
              />{" "}
              Adjuntar documento acreditativo de identidad.
            </label>
            <p style={{ fontSize: 12, marginTop: -15 }}>
              *Formatos admitidos: PDF, JPG, PNG. Máx. 4MB
            </p>
          </div>
          {displayDniInput ? (
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                required
                onChange={handlePdfFileChange}
                name="pdfFile"
                multiple
              />
            </div>
          ) : null}

          {!pdfFileError ? null : <p className="text-danger">{pdfFileError}</p>}

          <div className="text-center">
            <button type="submit" className="g-recaptcha">
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
          </div>
          {/* POLITICA DE PRIVACIDAD */}
          <div>
            <p style={{ fontSize: 12, marginTop: 10, textAlign: "center" }}>
              <input
                type="checkbox"
                name="privacidad"
                id="privacidad"
                onChange={handleDisplayPrivacidad}
              />{" "}
              Acepto la <a href={`/aviso-legal`}>política de privacidad</a> y
              consiento la utilización de mis datos personales para fines
              comerciales.
            </p>
          </div>
        </form>
      </main>
      {/* <Toaster /> */}
    </div>
  );
};
export default ContactFormPDF;
