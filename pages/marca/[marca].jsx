import MarcasJson from "../../assets/marcas.json";
import VehiclesJson from "../../assets/vehicles.json";
import Head from "next/head";
import Image from "next/image";
import Vehicles from "../../components/Vehicles";
import SectionContact from "../../components/SectionContact";

export async function getStaticPaths() {
  const paths = MarcasJson.map((m) => ({
    params: { marca: m.nombre.toLowerCase() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const marca = MarcasJson.find((m) => m.nombre.toLowerCase() === params.marca);
  const vehicles = VehiclesJson.filter(
    (v) => v.marca.toLowerCase() === params.marca
  );
  return { props: { marca, vehicles } };
}

export default function Marca({ marca, vehicles }) {
  return (
    <>
      <Head>
        <title>
          Macroconcesionario| Coches de la marca {marca.nombre} |
          macroconcesionario.com
        </title>
        <meta
          name="description"
          content={`En esta sección les mostramos los coches que ofrecemos pertenecientes a la marca ${marca}`}
        />
      </Head>

      <div className="header">
        <h1 className="title">
          <span className="fw-normal">Vehículos de la marca</span>
          <span className="ms-3 text-uppercase">{marca.nombre}</span>
        </h1>
      </div>
      <div className="container pt-4">
        <section
          id="section__top-vehicles"
          className="section__top-vehicles my-4"
        >
          <div className="my-3">
            <Image
              loading="lazy"
              alt={marca.nombre}
              src={`/img/iconosMarca/${marca.img}`}
              width="120"
              height="120"
            />
          </div>

          <Vehicles vehicles={vehicles} isRankingPage={false} />
        </section>

        <SectionContact />
      </div>
    </>
  );
}
