import Head from "next/head";
import axios from "../../utils/axiosInstance";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Comment from "../../components/Comment";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getServerSideProps({ query }) {
  try {
    const res = await axios("debate/" + query.oid);
    const debate = res.data;
    return { props: { debate } };
  } catch (error) {
    console.log(error.response.data);
    return { notFound: true };
  }
}

export default function Pregunta({ debate }) {
  const user = useSelector((state) => state.userReducer);

  const goToComment = () => {
    window.scrollTo({
      top: document.querySelector("#deja-tu-respuesta").offsetTop - 150,
      behavior: "smooth",
    });
  };
  //console.log(user)
  if (
    debate.estado === 1 ||
    user.role === "admin" ||
    user.role === "supervisor"
  ) {
    return (
      <>
        <Head>
          <title>
            {debate.title} | Opiniones - Macroconcesionario: Macroconcesionario
          </title>
          <meta name="description" content={debate.comments[0].description} />
        </Head>

        <div className="container p-0 p-md-4">
          <div className="section_team mt-4 mb-0 align-items-end">
            <Button
              text="Deja tu comentario"
              icon="chevron-circle-down"
              bg="var(--primary-color)"
              color="white"
              iconColor="white"
              onClick={goToComment}
            />
          </div>

          <section className="section_team debate-container mt-4">
            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
            >
              <Comment debate={debate} />
            </GoogleReCaptchaProvider>
          </section>
        </div>
      </>
    );
  } else {
    return (
      <div className="container d-flex justify-content-center">
        <div className="text-center" style={{ marginTop: "5rem" }}>
          <h2>Error 404</h2>
          <p>Lo siento, no se ha encontrado la página solicitada.</p>
          <Link href="/">
            <a>
              <button className="btn-contact">Volver a página principal</button>
            </a>
          </Link>
        </div>
      </div>
    );
  }
}
