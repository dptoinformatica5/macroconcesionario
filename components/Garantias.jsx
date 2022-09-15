import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Garantias() {
  return (
    <Container>
      <div style={{ backgroundColor: "#fafafa", paddingTop: 30 }}>
        <h2 className="title title-red">La mejor alternativa en automoción</h2>
        <p>
          Compra tu coche eléctrico o convencional al mejor precio con nosotros.
          También tenemos todo en vehículos pesados y maquinaria.
        </p>
      </div>
      <Row md={4}>
        <div style={{ backgroundColor: "#fafafa", padding: 30, width: 400 }}>
          <Col
            xs={6}
            style={{
              backgroundColor: "white",
              display: "block",
              width: 400,
              height: 300,
              padding: 90,
              borderRadius: 5,
              borderColor: "blue",
            }}
          >
            <h5>Garantía de la Casa Oficial</h5>
            <p style={{ height: 2, paddingTop: 30 }}>
              Siempre obtendrá la garantía de la casa oficial después de la
              compra.
            </p>
          </Col>
        </div>
        <div style={{ backgroundColor: "#fafafa", padding: 30, width: 400 }}>
          <Col
            xs={6}
            style={{
              backgroundColor: "white",
              display: "block",
              width: 400,
              height: 300,
              padding: 90,
              borderRadius: 5,
              borderColor: "blue",
            }}
          >
            <h5>Compra Segura</h5>
            <p style={{ height: 2, paddingTop: 30 }}>
              Sea cual sea el origen del vehículo, siempre realiza el pago con
              nosotros directamente.
            </p>
          </Col>
        </div>
        <div style={{ backgroundColor: "#fafafa", padding: 30, width: 400 }}>
          <Col
            xs={6}
            style={{
              backgroundColor: "white",
              display: "block",
              width: 400,
              height: 300,
              padding: 90,
              borderRadius: 5,
            }}
          >
            <h5>Devolución</h5>
            <p style={{ height: 2, paddingTop: 30 }}>
              Puede devolver el vehículo hasta los 14 días posteriores a su
              recepción.
            </p>
          </Col>
        </div>
      </Row>
    </Container>
  );
}

export default Garantias;
