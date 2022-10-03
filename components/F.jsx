export default function Formulariocampos() {
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
  </>;
}
