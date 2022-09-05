import { getServerSideSitemap } from "next-sitemap";
import axios from "../../utils/axiosInstance";

export async function getServerSideProps(ctx) {
  try {
    const { data } = await axios("debates");
    const fields = data.map((opinion) => ({
      loc: `https://macroconcesionario.com/opinion/${opinion.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
    }));

    return getServerSideSitemap(ctx, fields);
  } catch (err) {
    console.log(error.response.data);
  }
}

export default () => {};
