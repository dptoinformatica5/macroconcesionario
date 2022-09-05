import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import axios from "axios";
const EnviarPdf = () => {
  //for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const initialState = {
    username: "Tester",
    email: "desarrollo@click2luck.com",
    pdf: "",
  };
  const [state, setState] = useState(initialState);
  const [isLoading, setisLoading] = useState(false);
  const [displayDniInput, setDisplayDniInput] = useState(false);

  //onchange event
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = (e) => {
        console.log("selectedFile", reader);
        setPdfFile({ result: e.target.result, name: selectedFile.name });
        setPdfFileError("");
      };
    } else {
      console.log("no es pdf");
      setPdfFile(null);
      setPdfFileError("Please select valid pdf file");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //si han seleccionado un pdf
    if (1) {
      setisLoading(true);
      try {
        const { data } = await axios.post("/api/contact", state);
        console.log("axios data", data);
        if (data.status === "success") {
          console.log(data.status);
          toast.success("Yeaaahhhh");
        }
      } catch (error) {
        console.log(error);
        toast.error("ERROR Catcha");
      }
      setisLoading(false);
    } else {
      // toast.custom(<div className="text-danger bg-success">Hello World</div>);
      toast.error("NOOOOPE!", {
        style: {
          minWidth: "250px",
          backgroundColor: "#d8000c",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
          // d8000c
          // success: 270
        },
      });
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

  return (
    <div className="d-flex justify-content-center">
      <main className="m-4">
        <h3>Formulario contacto</h3>
        <form className="form-group card border p-2" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              name="username"
              value={state.username}
              onChange={handleInputs}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              name="email"
              value={state.email}
              onChange={handleInputs}
            />
          </div>
          <label htmlFor="dniAttached" className="mb-2">
            <input
              type="checkbox"
              name="checkdni"
              id="dniAttached"
              onChange={handleDisplayDniForm}
            />{" "}
            Adjuntar DNI
          </label>
          {displayDniInput ? (
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                required
                onChange={handlePdfFileChange}
                name="pdfFile"
                accept="application/pdf"
              />
            </div>
          ) : null}

          {!pdfFileError ? null : <p className="text-danger">{pdfFileError}</p>}

          <div className="text-center">
            {isLoading ? (
              <Loader />
            ) : (
              <button type="submit" className="btn btn-success px-4 mt-3">
                Enviar
              </button>
            )}
          </div>
        </form>
      </main>
      <Toaster />
    </div>
  );
};

export default EnviarPdf;
