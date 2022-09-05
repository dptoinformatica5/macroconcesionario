import vehiclesJson from "../assets/vehicles.json";
import rankingSemanal from "../assets/informeSemanal.json";
import Vehicles from "../components/Vehicles";
import Head from "next/head";
import { useState, useEffect } from "react";
import SorteoAlert from "../components/SorteoAlert";
import SectionContact from "../components/SectionContact";
import InformeCards from "../components/InformeCards";

export default function InformeSemanal() {
  const [vehicles, setVehicles] = useState([]);
  const ranking = rankingSemanal[0];

  useEffect(() => {
    const rankingVehicles = [];
    ranking.vehiculos.forEach((rs) => {
      rankingVehicles.push(vehiclesJson.find((v) => v.vehicle_name === rs));
    });
    setVehicles(rankingVehicles);
  }, []);

  return (
    <>
      <Head>
        <title>
          Macroconcesionario| Ranking de los coches eléctricos más vendidos de
          la semana | macroconcesionario.com
        </title>
        <meta
          name="description"
          content="En esta sección les mostramos el ranking de los coches eléctricos más vendidos de la semana."
        />
      </Head>

      <div className="header">
        <h1 className="title">
          Vehículos más vendidos de la semana:{" "}
          <span style={{ fontWeight: "normal" }}>{ranking.fecha}</span>
        </h1>
        <h2 className="subtitle">
          Aquí les mostramos la lista de los 10 coches eléctricos(EV) más
          vendidos de la semana.
        </h2>
      </div>
      <div className="container pt-4">
        <section
          id="section__top-vehicles"
          className="section__top-vehicles my-4"
        >
          {/* <SorteoAlert />             */}
          <InformeCards vehicles={vehicles} isRankingPage />
          {/* <Vehicles vehicles={vehicles} isRankingPage /> */}
        </section>

        <SectionContact />
      </div>
    </>
  );
}
