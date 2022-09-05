import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import parse from "html-react-parser";
import moment from "../../utils/moment";
import styles from "../../styles/Noticia.module.css";

export async function getStaticPaths() {
  try {
    const ultimasNoticias = await axios.get(
      process.env.NEXT_PUBLIC_Macroconcesionario_NOTICIAS_URI +
        "/posts?per_page=100"
    );
    const paths = ultimasNoticias.data.map((noticia) => {
      return { params: { id: noticia.slug } };
    });
    return { paths, fallback: "blocking" };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_Macroconcesionario_NOTICIAS_URI +
        "/posts?slug=" +
        params.id
    );
    const { data: images } = await axios.get(
      process.env.NEXT_PUBLIC_Macroconcesionario_NOTICIAS_URI +
        "/media?parent=" +
        data[0].id
    );
    return {
      props: { noticia: data[0], images },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function Noticia({ noticia, images }) {
  const router = useRouter();

  const renderContent = (content) => {
    const parsed = parse(content);
    let posFirstImage;
    parsed.forEach((el, i) => {
      if (el.type === "figure") {
        if (el.props.children.type === "img") {
          const { src, alt } = el.props.children.props;
          parsed[i] = (
            <div
              key={i}
              className={`noticia-content-img ${posFirstImage ? "mb-3" : ""}`}
            >
              <Image
                src={src}
                alt={alt || src}
                layout="fill"
                objectFit="cover"
              />
            </div>
          );
        }

        if (!posFirstImage) posFirstImage = i;
      }
    });

    const date = (
      <>
        <small className="float-end mt-2 mb-4">
          {moment(noticia.acf.fecha).format("D MMMM, YYYY")}
        </small>
        <div className="clearfix"></div>
      </>
    );
    parsed.splice(posFirstImage + 1, 0, date);
    return parsed;
  };

  const removeHtmlTag = (str) => str.replace(/(<([^>]+)>)/gi, "");

  const getSubtitle = (content) => {
    const initial = content.indexOf("<p>");
    const final = content.indexOf("</p>");
    const str = content.substring(initial + 3, final);
    return str;
  };

  return (
    <>
      <Head>
        <title>
          {noticia.title.rendered} | Noticias sobre coches eléctricos |
          Macroconcesionario: Macroconcesionario
        </title>
        <meta
          name="description"
          content={removeHtmlTag(getSubtitle(noticia.content.rendered))}
        />

        <meta property="og:site_name" content="Macroconcesionario" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={noticia.title.rendered} />
        <meta
          property="og:description"
          content={removeHtmlTag(getSubtitle(noticia.content.rendered))}
        />
        <meta
          property="og:url"
          content={`https://www.macroconcesionario.com${router.asPath}`}
        />
        <meta property="og:image" content={images[0].guid.rendered} />
        <meta
          property="og:image:secure_url"
          content={images[0].guid.rendered}
        />
        <meta property="og:locale" content="es_ES" />

        <meta
          property="twitter:url"
          content={`https://www.macroconcesionario.com${router.asPath}`}
        />
        <meta name="twitter:title" content={noticia.title.rendered} />
        <meta
          name="twitter:description"
          content={removeHtmlTag(getSubtitle(noticia.content.rendered))}
        />
        <meta name="twitter:image" content={images[0].guid.rendered} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="container">
        <section
          style={{ width: "80%" }}
          className="section_team align-items-start noticia-single"
        >
          <h2 className={styles.noticiaHeading}>{noticia.title.rendered}</h2>
          <div className={styles.divider}></div>
          <div>{renderContent(noticia.content.rendered)}</div>
        </section>
      </div>
    </>
  );
}
