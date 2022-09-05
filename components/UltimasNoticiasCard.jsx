import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Col, Card } from "react-bootstrap";
import styles from "../styles/UltimasNoticias.module.css";
import parse from "html-react-parser";
import moment from "../utils/moment";
import { Container, Row } from "react-bootstrap";

const UltimasNoticiasCard = ({ noticias, page }) => {
  const getSubtitle = (content) => {
    const initial = content.indexOf("<p>");
    const final = content.indexOf("</p>");
    const str = content.substring(initial + 3, final);
    return parse(str);
  };

  const getImage = (content) => {
    const initial = content.indexOf("<figure");
    const final = content.indexOf("</figure>");
    const str = content.substring(initial, final + 9);
    return parse(str);
  };
  return (
    <Container fluid className={styles.noticiaContainer}>
      <Row className="card-group g-5">
        {noticias?.map((n, i) => {
          return (
            <Col
              key={i}
              xs={12}
              sm={12}
              md={6}
              className={page === "inicio" && "col-lg-4"}
            >
              <Card className={styles.vehicleCard}>
                <>{getImage(n.content.rendered)}</>
                <Card.Body className="d-flex flex-column justify-content-end">
                  <h2 className={`ellipsis ${styles.noticiaTitle}`}>
                    {n.title.rendered}
                  </h2>
                  <div className={styles.divider}></div>
                  <div>
                    <p className={`ellipsis ${styles.noticiaContent}`}>
                      {getSubtitle(n.content.rendered)}
                    </p>
                  </div>
                  <div>
                    <small>{moment(n.acf.fecha).format("D MMMM, YYYY")}</small>
                    <small className={`float-end ${styles.leermasBtn}`}>
                      <a href={`/noticia/${n.slug}`}>
                        Leer más <FontAwesomeIcon icon={faArrowRight} />
                      </a>
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default UltimasNoticiasCard;
