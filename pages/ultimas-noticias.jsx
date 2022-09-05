import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "../utils/moment";
import UltimasNoticiasCard from "../components/UltimasNoticiasCard";
import Pagination from "../components/Pagination";

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_Macroconcesionario_NOTICIAS_URI +
        "/posts?per_page=100"
    );
    const ultimasNoticias = data.sort((a, b) => {
      return new Date(moment(b.acf.fecha)) - new Date(moment(a.acf.fecha));
    });
    return { props: { ultimasNoticias } };
  } catch (error) {
    console.log(error);
  }
}

export default function UltimasNoticas({ ultimasNoticias }) {
  const [noticias, setNoticias] = useState(ultimasNoticias);
  const router = useRouter();
  const pageSize = 6;

  useEffect(() => {
    const p = router.query.page;
    let limitNoticias = [...ultimasNoticias];
    const startIndex = (p - 1) * pageSize;

    if (!p || p == 1) {
      limitNoticias = limitNoticias.slice(0, pageSize);
    } else {
      limitNoticias = limitNoticias.slice(startIndex, startIndex + pageSize);
    }
    setNoticias(limitNoticias);
  }, [router]);

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
          <Pagination
            array={ultimasNoticias}
            pageSize={pageSize}
            url="noticias"
          />
        </section>
      </div>
    </>
  );
}
