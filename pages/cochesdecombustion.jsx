// import MarcasJson from "../assets/marcas.json";
import Head from "next/head";
import SorteoAlert from "../components/SorteoAlert";
import SectionContact from "../components/SectionContact";
import CombustionCard from "../components/CombustionCard";

export default function CochesCombustion() {
  return (
    <>
      <Head>
        <title>
          Macroconcesionario| Coches de Combustión | macroconcesionario.com
        </title>
      </Head>

      <div className="header px-0 px-lg-2">
        <h1 className="title">Coches de Combustión</h1>
        <h2 className="subtitle">
          Accede a nuestro amplio catálogo en automoción
          <br />
          <br />
          Selecciona la marca y modelo disponible
        </h2>
      </div>
      <div className="container pt-4">
        <section
          id="section__top-vehicles"
          className="section__top-vehicles my-4"
        >
          {/* <SorteoAlert /> */}
          <CombustionCard />
        </section>

        <SectionContact />
      </div>
    </>
  );
}
