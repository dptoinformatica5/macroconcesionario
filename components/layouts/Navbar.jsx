import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../../utils/axiosInstance";
import { Dropdown } from "react-bootstrap";
import Icon from "../Icon";
import dynamic from "next/dynamic";
const AvatarSettings = dynamic(() => import("../AvatarSettings"), {
  ssr: false,
});

export default function Navbar() {
  const router = useRouter();
  const refMenuBtn = useRef(null);
  const refSidebar = useRef(null);
  const refSidebarClose = useRef(null);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleMenu = (ref) => {
    if (refMenuBtn.current.id === ref) {
      refSidebar.current.classList.add("open");
    }
    if (refSidebarClose.current.id === ref) {
      refSidebar.current.classList.remove("open");
    }
  };

  const hideSidebar = () => refSidebar.current.classList.remove("open");

  const handleLogout = async () => {
    try {
      const { refreshToken } = user;
      await axios.post("logout", { user_id: user._id, refreshToken });
      if (user.googleUser) {
        const auth2 = gapi.auth2.getAuthInstance();
        if (auth2 != null) auth2.signOut().then(auth2.disconnect());
      }
      dispatch(logout());
      return router.push("/");
    } catch (error) {
      console.log("No se ha podido cerrar sesión: ", error);
      dispatch(logout());
    }
  };

  return (
    <nav id="navbar" className="">
      <div className="nav-wrapper">
        <div className="logo-container">
          <Link href="/">
            <a>
              <Image
                src="/img/logo.svg"
                alt="logo Macroconcesionario"
                width={300}
                height={100}
                priority
              />
            </a>
          </Link>
        </div>

        <div className="links-container">
          <div className="nav-link-wrapper">
            <Link href="/">
              <a
                className={`nav-link ${
                  router.pathname === "/" ||
                  router.pathname.includes("/vehiculos/")
                    ? "nav-link-active"
                    : ""
                }`}
              >
                Inicio
              </a>
            </Link>
          </div>

          <Dropdown>
            <Dropdown.Toggle id="navbar-dropdown">Vehículos</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/marcas">Coches Eléctricos</Dropdown.Item>
              {/* 
              <Dropdown.Item href="/marcas">Coches de Combustión</Dropdown.Item>
              <Dropdown.Item href="/marcas">Maquinaria</Dropdown.Item>
              */}
            </Dropdown.Menu>
          </Dropdown>

          <div className="nav-link-wrapper">
            <Link href="/marcas">
              <a
                className={`nav-link ${
                  router.pathname === "/marcas" ? "nav-link-active" : ""
                }`}
              >
                Marcas
              </a>
            </Link>
          </div>

          <div className="nav-link-wrapper">
            <Link href="/informe-semanal">
              <a
                className={`nav-link ${
                  router.pathname === "/informe-semanal"
                    ? "nav-link-active"
                    : ""
                }`}
              >
                Tendencias en Coches
              </a>
            </Link>
          </div>

          <Dropdown>
            <Dropdown.Toggle id="navbar-dropdown">Nosotros</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/nuestro-metodo">
                Nuestro Método
              </Dropdown.Item>
              <Dropdown.Item href="/#contacto">Contacto</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="nav-link-wrapper">
            <Link href="/requisitos-de-compra">
              <a
                className={`nav-link ${
                  router.pathname === "/requisitos-de-compra"
                    ? "nav-link-active"
                    : ""
                }`}
              >
                Requisitos
              </a>
            </Link>
          </div>

          {/* <div className="nav-link-wrapper">
                        <Link href="/ultimas-noticias">
                            <a className={`nav-link ${router.pathname === "/ultimas-noticias" || router.pathname.includes('/noticias/') ? "nav-link-active" : ""}`}>Últimas Noticias</a>
                        </Link>
                    </div>

                    <div className="nav-link-wrapper">
                        <Link href="/opiniones">
                            <a className={`nav-link ${router.pathname === "/opiniones" ? "nav-link-active" : ""}`}>Opiniones</a>
                        </Link>
                    </div>  

                    <div className="align-self-stretch d-flex align-items-center">
                        <AvatarSettings user={user} handleLogout={handleLogout}/>
                    </div>      */}
        </div>

        {/* Avatar mobile */}
        <div className="responsive-right align-items-center">
          {/* <AvatarSettings
            user={user}
            responsive={true}
            handleLogout={handleLogout}
          /> */}
          <div
            ref={refMenuBtn}
            id="menu-btn"
            onClick={() => handleMenu("menu-btn")}
            className="responsive-links-container"
          >
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
              style={{ color: "black" }}
            />
          </div>
        </div>

        <div id="sidebar" ref={refSidebar} className="sidebar">
          <div className="sidebar-links">
            <div className="sidebar-link-wrapper">
              <Link href="/">
                <a onClick={hideSidebar}>
                  <Icon icon="home" color="white" />
                  <span className="ms-2">Inicio</span>
                </a>
              </Link>
            </div>
            <div className="sidebar-link-wrapper">
              <Link href="/marcas">
                <a onClick={hideSidebar}>
                  <Icon icon="car" color="white" />
                  <span className="ms-2">Marcas</span>
                </a>
              </Link>
            </div>
            <div className="sidebar-link-wrapper">
              <Link href="/informe-semanal">
                <a onClick={hideSidebar}>
                  <Icon icon="file-alt" color="white" />
                  <span className="ms-2">Informe semanal</span>
                </a>
              </Link>
            </div>

            {/* <div className="sidebar-link-wrapper">
              <Link href="/opiniones">
                <a onClick={hideSidebar}>
                  <Icon icon="comments" color="white" />
                  <span className="ms-2">Opiniones</span>
                </a>
              </Link>
            </div> */}

            <div className="sidebar-link-wrapper">
              <Link href="/sobre-nosotros">
                <a onClick={hideSidebar}>
                  <Icon icon="users" color="white" />
                  <span className="ms-2">Sobre nosotros</span>
                </a>
              </Link>
            </div>
            <div className="sidebar-link-wrapper">
              <Link href="/requisitos-de-compra">
                <a onClick={hideSidebar}>
                  <Icon icon="clipboard-check" color="white" />
                  <span className="ms-2">Requisitos de compra</span>
                </a>
              </Link>
            </div>
            <div className="sidebar-link-wrapper">
              <Link href="/ultimas-noticias">
                <a onClick={hideSidebar}>
                  <Icon icon="newspaper" color="white" />
                  <span className="ms-2">Últimas noticias</span>
                </a>
              </Link>
            </div>
            <div className="sidebar-link-wrapper">
              <Link href="/nuestro-metodo">
                <a onClick={hideSidebar}>
                  <Icon icon="key" color="white" />
                  <span className="ms-2">Nuestro Método</span>
                </a>
              </Link>
            </div>
            <div className="sidebar-link-wrapper">
              <Link href="#contacto">
                <a onClick={hideSidebar}>
                  <Icon icon="address-card" color="white" />
                  <span className="ms-2">Contacto</span>
                </a>
              </Link>
            </div>
            <div className="sidebar-link-wrapper">
              <button
                id="sidebar-close"
                onClick={() => handleMenu("sidebar-close")}
                ref={refSidebarClose}
                className="sidebar-close"
                aria-label="close sidebar"
              >
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  size="lg"
                  style={{ color: "white" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
