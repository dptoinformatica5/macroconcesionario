export const formatFecha = (fecha) => {
  const date = new Date(fecha);
  let day = "0" + date.getDate().toString();
  let month = "0" + (date.getMonth() + 1).toString();
  const year = date.getFullYear();
  return `${day.substr(-2)}-${month.substr(-2)}-${year}`;
};

export const classEstado = (val) => {
  if (val === 0) return "estado";
  if (val === 1) return "estado-publicado";
  return "estado-no-publicado";
};

export const estado = (val) => {
  if (val === 0) return "en revisión";
  if (val === 1) return "publicado";
  return "no publicado";
};

export const checkRole = (role) =>
  role === "superadmin" || role === "supervisor";

export const renderAuthor = (comment, user_id) =>
  comment.creator === user_id ? "Tu" : comment.author;

export function checkDni(dni) {
  var numero;
  var letr;
  var letra;
  var expresion_regular_dni;

  expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

  if (expresion_regular_dni.test(dni) == true) {
    numero = dni.substr(0, dni.length - 1);
    letr = dni.substr(dni.length - 1, 1);
    numero = numero % 23;
    letra = "TRWAGMYFPDXBNJZSQVHLCKET";
    letra = letra.substring(numero, numero + 1);
    if (letra != letr.toUpperCase()) {
      console.log("Dni erroneo, la letra del NIF no se corresponde");
      return false;
    } else {
      console.log("Dni correcto");
      return true;
    }
  } else {
    console.log("Dni erroneo, formato no válido");
    return false;
  }
}
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const renderAlert = (emailSent, router) => {
  if (emailSent) {
    let res = (
      <div className="alert alert-success" role="alert">
        ¡Mensaje enviado correctamente!
      </div>
    );
    if (emailSent.status === "error") {
      res = (
        <div className="alert alert-danger" role="alert">
          {emailSent.error}
        </div>
      );
    }

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;

    setTimeout(() => {
      const alert = document.querySelector(".alert");
      if (alert) {
        alert.style.display = "none";
        if (emailSent.status === "success") {
          router.push("/");
        }
      }
    }, 5000);

    return res;
  }
};
