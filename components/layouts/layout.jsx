import Head from "next/head";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Carousel from "../Carousel";
import CookieConsent from "react-cookie-consent";

export default function Layout({ children }) {
  const router = useRouter();
  const routes = ["/admin", "/login", "/registro", "/test"];

  const checkRenderCarousel = () => {
    if (router.asPath === "/") return true;

    let res = true;
    routes.forEach((r) => {
      if (r.includes(router.asPath)) res = false;
    });
    return res;
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>
          Macroconcesionario| Venta de vehículos eléctricos e híbridos en
          Europa.
        </title>
        <meta
          name="description"
          content="Macroconcesionario. Líder en ventas de coches eléctricos e híbridos enchufables en España y Europa. Coches eléctricos, coches híbridos, coches híbridos enchufables, Macroconcesionario españa, Macroconcesionario europa"
        />
        <meta
          name="keywords"
          content="Macroconcesionario, coches eléctricos, coches híbridos, coches híbridos enchufables, coches online, vehículos eléctricos, vehiculos híbridos, vehiculos eléctricos online"
        />
        <meta name="author" content="Macroconcesionario" />
        <meta name="robots" content="index,follow" />
      </Head>

      <Navbar />
      {checkRenderCarousel() && <Carousel />}
      <main>{children}</main>
      {!router.asPath.includes("/admin") && <Footer />}

      <CookieConsent
        buttonText="Aceptar"
        buttonStyle={{
          backgroundColor: "var(--primary-color)",
          color: "white",
          border: "1px solid #ccc",
        }}
      >
        <span>
          Éste sitio web usa cookies, si permanece aquí acepta su uso. Puede
          leer más sobre el uso de cookies en nuestra{" "}
        </span>
        <Link href="/aviso-legal#politica-de-privacidad">
          <a target="blank" className="text-white">
            política de privacidad.
          </a>
        </Link>
      </CookieConsent>
    </>
  );
}
