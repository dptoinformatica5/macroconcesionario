import Head from "next/head";
import vehiclesList from "../../assets/vehicles.json";
import Vehicles from "../../components/Vehicles";
import Pagination from "../../components/Pagination";
import Sabermas from "../../components/sabermas/Sabermas";
import SectionContact from "../../components/SectionContact";

const pageSize = 7;

export async function getStaticPaths() {
  const pages = Math.ceil(vehiclesList.length / pageSize);
  const paths = [];
  for (let i = 1; i <= pages; i++) {
    paths.push({ params: { page: i + "" } });
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { page } = params;
  let limitVehicles = [...vehiclesList];
  const startIndex = (page - 1) * pageSize;

  if (!page || page == 1) {
    limitVehicles = limitVehicles.slice(0, pageSize);
  } else {
    limitVehicles = limitVehicles.slice(startIndex, startIndex + pageSize);
  }

  return { props: { vehicles: limitVehicles } };
}

export default function Page({ vehicles }) {
  return (
    <>
      <Head>
        <title>
          Macroconcesionario| Mejores Coches Eléctricos 2022 |
          macroconcesionario.com
        </title>
      </Head>

      <div className="header">
        <h1 className="title">Mejores Coches Eléctricos de 2022</h1>
        <h2 className="subtitle">
          Podemos afirmar sin equivocarnos que el sector de la movilidad
          eléctrica está en auge. Es por eso que te traemos una lista con los
          mejores coches eléctricos de 2022.
        </h2>
      </div>
      <div className="container pt-4">
        {/* vehicles */}
        <section
          id="section__top-vehicles"
          className="section__top-vehicles my-4"
        >
          <Vehicles vehicles={vehicles} />
          <Pagination
            array={vehiclesList}
            pageSize={pageSize}
            url="vehiculos"
          />
        </section>
        {/* vehicles end */}

        <Sabermas />
        <SectionContact />
      </div>
    </>
  );
}
