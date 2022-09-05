import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Usuarios from "../components/admin/Usuarios";
import UsuariosGoogle from "../components/admin/UsuariosGoogle";
import Dominios from "../components/admin/Dominios";
import jwt_decode from "jwt-decode";

export default function Admin() {
  const user = useSelector((state) => state.userReducer);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [modulo, setModulo] = useState("usuarios");

  const renderModulo = () => {
    switch (modulo) {
      case "usuarios":
        return <Usuarios role={user.role} />;
      case "usuarios_google":
        return <UsuariosGoogle role={user.role} />;
      case "dominios":
        return <Dominios />;
      case "opiniones":
        router.push("/admin/opiniones");
    }
  };

  useEffect(() => {
    if (user.accessToken) {
      const decoded = jwt_decode(user.accessToken);
      if (decoded.role === "superadmin" || decoded.role === "supervisor") {
        return setIsAdmin(true);
      }
      return router.push("/");
    }
  }, [user]);

  return (
    <>
      {isAdmin && (
        <div className="container p-4">
          <h1 className="title-red">Panel Admin</h1>

          <div className="modulo">
            <select
              className="form-select mb-3"
              name="modulo"
              value={modulo}
              onChange={(e) => setModulo(e.target.value)}
              required
            >
              <option value="dominios">Dominios</option>
              <option value="usuarios">Usuarios</option>
              <option value="usuarios_google">Usuarios de Google</option>
              <option value="opiniones">Opiniones</option>
            </select>
          </div>

          {renderModulo()}
        </div>
      )}
    </>
  );
}
