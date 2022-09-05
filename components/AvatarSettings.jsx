import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import router from "next/router";

export default function AvatarSettings({ user, responsive, handleLogout }) {
  const refAvatarMenu = useRef(null);
  const refAvatarMenuResponsive = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      const { id } = e.target;
      let d_none = true;
      if (responsive) {
        d_none = refAvatarMenuResponsive.current.classList.contains("d-none");
      } else {
        d_none = refAvatarMenu.current.classList.contains("d-none");
      }
      if (id !== "avatar-button" && !d_none) {
        if (responsive)
          return refAvatarMenuResponsive.current.classList.add("d-none");
        return refAvatarMenu.current.classList.add("d-none");
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const hideAvatarMenu = () => {
    if (responsive) {
      refAvatarMenuResponsive.current.classList.toggle("d-none");
    } else {
      refAvatarMenu.current.classList.toggle("d-none");
    }
  };

  const handleRedirect = (url) => {
    if (!user.accessToken) return router.push(url);

    hideAvatarMenu();
    url === "/logout" ? handleLogout() : router.push(url);
  };

  return (
    <>
      {user.accessToken ? (
        <div
          className="avatar position-relative"
          id={`${responsive ? "avatar" : "avatar-lg"}`}
          title="Mi cuenta"
        >
          <div
            className="d-flex align-items-center h-100 pointer"
            id="avatar-button"
            onClick={hideAvatarMenu}
          >
            <FontAwesomeIcon
              icon={faUserCircle}
              size="2x"
              style={{ color: "var(--primary-color)", pointerEvents: "none" }}
            />
          </div>

          <ul
            ref={responsive ? refAvatarMenuResponsive : refAvatarMenu}
            className={`avatar-menu d-none ${
              responsive ? "avatar-menu-responsive" : ""
            }`}
          >
            <li
              className="text-truncate"
              onClick={() => handleRedirect("/cuenta")}
            >
              <b>{user.name}</b>
              <br />
              {user.email}
            </li>
            <li onClick={() => handleRedirect("/logout")}>
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
              <span>Cerrar Sesión</span>
            </li>
          </ul>
        </div>
      ) : (
        <div
          className="avatar position-relative"
          id={`${responsive ? "avatar" : "avatar-lg"}`}
          title="Mi cuenta"
        >
          <div className="d-flex align-items-center h-100">
            <FontAwesomeIcon
              icon={faUserCircle}
              size="2x"
              style={{ color: "#bbb", cursor: "pointer" }}
              onClick={() => handleRedirect("/login")}
            />
          </div>
          <ul
            ref={responsive ? refAvatarMenuResponsive : refAvatarMenu}
            className={`avatar-menu d-none ${
              responsive ? "avatar-menu-responsive" : ""
            }`}
          >
            <li onClick={() => handleRedirect("/login")}>
              <FontAwesomeIcon icon={faSignInAlt} size="lg" />
              <span>Iniciar Sesión</span>
            </li>
            <li onClick={() => handleRedirect("/registro")}>
              <FontAwesomeIcon icon={faUserPlus} size="lg" />
              <span>Crear Cuenta</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
