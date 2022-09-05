import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhoneAlt,
  faClock,
  faLocation,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.myFooter}>
      <div className={styles.footerWrapper}>
        <Container fluid>
          <Row>
            {/* logo */}
            <Col sm={6} lg={4} className="my-4 my-sm-0 mb-sm-4">
              <div className={styles.footerLogo}>
                <Image
                  src="/img/logoBlanco.svg"
                  alt="logo Macroconcesionario"
                  width={250}
                  height={64}
                  priority
                />
              </div>
            </Col>
            {/* links */}
            <Col
              sm={6}
              lg={8}
              className="my-4 my-sm-0 mb-sm-4 d-lg-flex align-items-center"
            >
              <ul className={styles.footerLinks}>
                <li>
                  <Link href="/marcas">Marcas</Link>
                </li>
                <li>
                  <Link href="/sobre-nosotros">Nosotros</Link>
                </li>
                <li>
                  <Link href="/ultimas-noticias">Noticias</Link>
                </li>
                <li>
                  <Link href="/opiniones">Opiniones</Link>
                </li>
                <li>
                  <Link href="/aviso-legal">Aviso legal</Link>
                </li>
                <li>
                  <Link href="/requisitos-de-compra">Requisitos de compra</Link>
                </li>
              </ul>
            </Col>
          </Row>
          <Row className={styles.footerDetails}>
            {/* contact info */}
            <Col xs={12} sm={6} lg={4} className="mb-4 mb-lg-0">
              <h4>Horario:</h4>
              <p>
                <FontAwesomeIcon icon={faClock} /> 09:00 - 18:00
              </p>
            </Col>
            <Col xs={12} sm={6} lg={4} className="mb-4 mb-lg-0">
              <h4>Telefono</h4>
              <p>
                <FontAwesomeIcon icon={faPhoneAlt} />{" "}
                <Link href="tel:900533961">
                  <a>900 533 961</a>
                </Link>
              </p>
            </Col>
            <Col xs={12} sm={12} lg={4}>
              <h4>Email:</h4>
              <p>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <Link href="mailto:info@macroconcesionario.com">
                  <a>info@macroconcesionario.com</a>
                </Link>
              </p>
            </Col>
            {/* <Col xs={6} lg={3}>
              <h4>Newsletter:</h4>
              <form
                method="post"
                role="form"
                className="d-flex"
              >
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
                <Button className={styles.btnSubscription}><FontAwesomeIcon icon={faArrowRight} /></Button>
              </form>
              <p className="mt-2">Obtener las últimas actualizaciones y ofertas</p>
            </Col> */}
          </Row>
          <Row className="my-4">
            <Col xs={12} sm={6}>
              <p>© 2022 - Macroconcesionario. All Rights Reserved.</p>
            </Col>
            {/* sociaL ICONS */}
            <Col xs={12} sm={6} className="d-flex justify-content-end">
              <Link
                href="https://www.facebook.com/macroconcesionario"
                title="facebook Macroconcesionario"
              >
                <a target="blank" aria-label="facebook Macroconcesionario">
                  <span className="social-icon-wrapper">
                    <FontAwesomeIcon
                      className={styles.footerSocial}
                      icon={faFacebook}
                    />
                  </span>
                </a>
              </Link>
              <Link
                href="https://twitter.com/macroconcesionario"
                title="twitter Macroconcesionario"
              >
                <a target="blank" aria-label="twitter Macroconcesionario">
                  <span className="social-icon-wrapper">
                    <FontAwesomeIcon
                      className={styles.footerSocial}
                      icon={faTwitter}
                    />
                  </span>
                </a>
              </Link>
              <Link
                href="https://www.instagram.com/macroconcesionario.com/"
                title="instagram Macroconcesionario"
              >
                <a target="blank" aria-label="instagram Macroconcesionario">
                  <span className="social-icon-wrapper">
                    <FontAwesomeIcon
                      className={styles.footerSocial}
                      icon={faInstagram}
                    />
                  </span>
                </a>
              </Link>
              <Link
                href="https://www.linkedin.com/company/79866315/"
                title="linkedin Macroconcesionario"
              >
                <a target="blank" aria-label="linkedin Macroconcesionario">
                  <span className="social-icon-wrapper">
                    <FontAwesomeIcon
                      className={styles.footerSocial}
                      icon={faLinkedin}
                    />
                  </span>
                </a>
              </Link>
            </Col>
          </Row>
          {/* imagen gobierno */}
          <Row>
            {/* <div className="footer-images">
              <div className="footer-image-wrapper">
                <Image
                  src="/img/gobierno.jpg"
                  alt="Macroconcesionario- gobierno de españa"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="footer-image-wrapper european">
                <Image
                  src="/img/european.png"
                  alt="Macroconcesionario- europa"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div> */}
            <p className="text-center">
              Registro Nº 202299908667503 de la Junta de Andalucía. Ministerio
              para la Transición Ecológica y el Reto Demográfico. Gobierno de
              España.
            </p>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
