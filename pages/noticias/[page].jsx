import Head from "next/head";
import axios from "axios";
import moment from "../../utils/moment";
import UltimasNoticiasCard from "../../components/UltimasNoticiasCard";
import Pagination from "../../components/Pagination";

const pageSize = 6;

export async function getStaticPaths() {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_Macroconcesionario_NOTICIAS_URI +
        "/posts?per_page=100"
    );
    const pages = Math.ceil(data.length / pageSize);
    const paths = [];
    for (let i = 1; i <= pages; i++) {
      paths.push({ params: { page: i + "" } });
    }
    return { paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const { page } = params;
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_Macroconcesionario_NOTICIAS_URI +
        "/posts?per_page=100"
    );
    const ultimasNoticias = data.sort((a, b) => {
      return new Date(moment(b.acf.fecha)) - new Date(moment(a.acf.fecha));
    });

    let limitNoticias = [...ultimasNoticias];
    const startIndex = (page - 1) * pageSize;
    if (!page || page == 1) {
      limitNoticias = limitNoticias.slice(0, pageSize);
    } else {
      limitNoticias = limitNoticias.slice(startIndex, startIndex + pageSize);
    }

    return {
      props: { noticias: limitNoticias, allNoticias: ultimasNoticias },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
  }
}

export default function Page({ noticias, allNoticias }) {
  return (
    <>
      <Head>
        <title>
          Últimas Noticias Macroconcesionario | Macroconcesionario |
          macroconcesionario.com
        </title>
        <meta
          name="description"
          content="Las últimas noticias sobre coches eléctricos e híbridos enchufables."
        />
      </Head>

      <div className="header py-5">
        <h1 className="title">Últimas Noticias</h1>
      </div>
      <div className="container pt-4">
        <section className="section_team mb-4">
          <UltimasNoticiasCard noticias={noticias} />
          <Pagination array={allNoticias} pageSize={pageSize} url="noticias" />
        </section>
      </div>
    </>
  );
}
