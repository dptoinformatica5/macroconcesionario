import vehiclesJson from "../assets/vehicles.json";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import moment from "../utils/moment";
import Vehicles from "../components/Vehicles";
import Pagination from "../components/Pagination";
import UltimasNoticiasCard from "../components/UltimasNoticiasCard";
import MarcaCard from "../components/MarcaCard";
import Sabermas from "../components/sabermas/Sabermas";
import SectionContact from "../components/SectionContact";

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_Macroconcesionario_NOTICIAS_URI +
        "/posts?per_page=10"
    );
    const ultimasNoticias = data.sort((a, b) => {
      return new Date(moment(b.acf.fecha)) - new Date(moment(a.acf.fecha));
    });
    return { props: { ultimasNoticias } };
  } catch (error) {
    console.log(error);
  }
}

export default function Home({ ultimasNoticias }) {
  const pageSize = 7;

  return (
    <>
      <Head>
        <title>
          Macroconcesionario | Coches eléctricos, vehículos pesados, maquinaria
          | Compra coches online
        </title>
        <meta
          name="keywords"
          content="vehículos de ocasión, coches de exposición, coches eléctricos online, vehículos pesados, coches eléctricos, coches híbridos, coches de combustión, buses de segunda mano, coches de segunda mano, coches híbridos enchufables, coches online, vehículos eléctricos, vehiculos híbridos, vehiculos eléctricos online"
        />

        <meta
          name="description"
          content="Macroconcesionario. Plataforma líder en venta de coches, maquinaria vehículos eléctricos y pesados en España y Europa. Compra desde tu coche eléctrico hasta un autobús, todo en automoción"
        />
      </Head>

      {/* Header dejabjo de carusel */}
      <div style={{ marginTop: 70 }}>
        <h1 className="title title-red w-100 text-center">
          La mejor alternativa en automoción
        </h1>
      </div>

      <div className="container pt-4">
        {/* vehicles */}
        <section
          id="section__top-vehicles"
          className="section__top-vehicles my-4"
        >
          <Vehicles vehicles={vehiclesJson.slice(0, 6)} />
          <Pagination
            array={vehiclesJson}
            pageSize={pageSize}
            url="vehiculos"
          />
        </section>
        {/* vehicles end */}

        {/* noticias */}
        {/* 
        <h1 className="title title-red w-100 text-center">Últimas Noticias</h1>
        <UltimasNoticiasCard
          noticias={ultimasNoticias?.slice(0, 3)}
          page="inicio"
        />
        <div className="verMasBtn">
          <Link href="/ultimas-noticias">Ver más noticias</Link>
        </div>
        {/* noticias end */}

        {/* marcas */}
        <h1 className="title title-red w-100 text-center">Buscar por marcas</h1>
        <MarcaCard page="inicio" />
        {/* marcas end */}
        <div style={{ marginTop: 70 }}>
          <h2 className="title title-red w-100 text-center">
            Compra tu coche eléctrico o convencional al mejor precio con
            nosotros. También tenemos todo en vehículos pesados y maquinaria.
          </h2>
        </div>

        {/* sabermas form */}
        <Sabermas />
        <SectionContact />
      </div>
    </>
  );
}
