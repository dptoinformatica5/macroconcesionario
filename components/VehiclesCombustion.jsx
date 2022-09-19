import Marcas from "../assets/marcas.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSelectedVehicle } from "../redux/actions";
import placeholderImage from "../assets/placeholderImage";
import styles from "../styles/Vehicles.module.css";
import CombustibleIcon from "../components/iconos/CombustibleIcon";
import CocheBlancoIcono from "../components/iconos/CocheBlancoIcono";

export default function VehiclesCombustion({
  vehicles,
  isRankingPage = false,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [state, setState] = useState({ marca: "" });

  useEffect(() => {
    if (!isRankingPage && state.marca) {
      router.push(`/contact}`);
    }
  }, [state]);

  const handleClick = (v) => router.push("/calcularCombustion?vid=" + v.id);

  const handleChange = (e) => {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const ordenarMarcas = (a, b) => {
    if (a.nombre < b.nombre) return -1;
    if (a.nombre > b.nombre) return 1;
    return 0;
  };

  const marcasOptions = () =>
    Marcas.sort(ordenarMarcas).map((m) => (
      <option key={m.nombre} value={m.nombre} className="options">
        {m.nombre}
      </option>
    ));

  return (
    <>
      {!isRankingPage && (
        <div className="w-100 d-flex justify-content-center p-4 px-5">
          <select
            className="form-select mx-1 marcasFilter option select-btn"
            style={{ maxWidth: "200px" }}
            name="marca"
            value={state.marca}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="" className="option">
              Todas las marcas
            </option>
            {marcasOptions()}
          </select>
        </div>
      )}
      <Container fluid className={styles.carContainer}>
        <Row className="row justify-content-center card-group g-5">
          {vehicles?.slice(0, 6).map((v, i) => (
            <Col key={i} md={6} lg={4}>
              <Card style={{ height: "100%" }}>
                <>
                  <Image
                    width={750}
                    height={500}
                    objectFit="cover"
                    src={`/img/${v.img}`}
                    alt={"Macroconcesionario- " + v.vehicle_name}
                  />
                </>
                <Card.Body className="d-flex flex-column p-0 justify-content-end">
                  <Card.Title className={styles.cardTitle}>
                    {v.vehicle_name}
                    {v.promocion && (
                      <div>
                        <span>{v.promocion}</span> dto.
                      </div>
                    )}
                  </Card.Title>
                  <div className={styles.divider}></div>
                  <div>
                    <p className={styles.cardSpecifications}>
                      <span className={styles.specificationsIcon}>
                        <CombustibleIcon />
                      </span>
                      {`Tipo de Combustible: ${v.autonomia}.`}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      onClick={() => handleClick(v)}
                      className={styles.btnCard}
                    >
                      <span>CALCULAR PRECIO</span>
                    </Button>
                    <div className={styles.btnCardFake}>
                      <CocheBlancoIcono />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
