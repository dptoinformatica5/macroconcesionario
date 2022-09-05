import Link from "next/link";
import Head from "next/head";
import axios from "../utils/axiosInstance";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import router from "next/router";
import Button from "../components/Button";
import Icon from "../components/Icon";
import LoginPopUp from "../components/modals/LoginPopUp";
import {
  formatFecha,
  classEstado,
  estado,
  checkRole,
  renderAuthor,
} from "../utils/helper";
import moment from "../utils/moment";
import SorteoAlert from "../components/SorteoAlert";
import Image from "next/image";

export async function getServerSideProps() {
  try {
    const res = await axios("debates");
    const fetchDebates = res.data;
    return { props: { fetchDebates } };
  } catch (error) {
    console.log(error);
  }
}

export default function Opiniones({ fetchDebates }) {
  const user = useSelector((state) => state.userReducer);
  const [debates, setDebates] = useState(fetchDebates);
  const [showCrearDebate, setShowCrearDebate] = useState(false);
  const [state, setState] = useState({
    title: "",
    description: "",
    author: user.name,
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const [send, setSend] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!searchValue) return setDebates(fetchDebates);

    const res = [];
    const strSearch = searchValue.toLowerCase();
    for (let i = 0; i < fetchDebates.length; i++) {
      const d = fetchDebates[i];
      const title = d.title.toLowerCase();
      if (title.includes(strSearch)) res.push(d);

      for (let j = 0; j < d.comments.length; j++) {
        const c = d.comments[j];
        const author = c.author.toLowerCase();

        if (author.includes(strSearch)) res.push(d);

        if (typeof c.description === "string") {
          const str = c.description.toLowerCase();
          if (str.includes(strSearch)) res.push(d);
        } else {
          for (let k = 0; k < c.description.content.length; k++) {
            const content = c.description.content[k];
            if (content.type === "paragraph" && content.content) {
              const str = content.content[0].text.toLowerCase();
              if (str.includes(strSearch)) res.push(d);
            }
          }
        }
      }
    }

    const uniques = Array.from(new Set(res.map((a) => a._id))).map((id) => {
      return res.find((a) => a._id === id);
    });

    setDebates(uniques);
  }, [searchValue]);

  const parseTipTap = ({ content }) => {
    return content.map((c, i) => {
      if (c.type === "paragraph") {
        if (!c.content)
          return <div key={i} className="w-100" style={{ height: "1rem" }} />;

        const text = c.content.map((el) => el.text);
        return (
          <p key={i} className="m-0 text-break w-100 pb-2">
            {text}
          </p>
        );
      }
      if (c.type === "image") {
        return (
          <div key={i} className="unset-img" style={{ maxWidth: "500px" }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_Macroconcesionario_API_STATIC_URI}img/comentarios/${c.attrs.src}`}
              alt={c.attrs.alt}
              className="custom-img custom-img-comment"
              layout="fill"
            />
          </div>
        );
      }
      if (c.type === "iframe") {
        return (
          <iframe
            key={i}
            className="tiptap-iframe"
            src={c.attrs.src}
            frameBorder={c.attrs.frameBorder}
            autoPlay
            allowFullScreen
          />
        );
      }
    });
  };

  const renderRespuestas = (comments) => {
    let publicados = comments.filter((c) => c.estado === 1);
    publicados = publicados
      .filter((c, i) => i === 0 || i === publicados.length - 1)
      .reverse();

    return (
      <div className="first-comments-container">
        {publicados.map((c, i) => (
          <div
            key={i}
            className={
              i > 4
                ? "d-none"
                : "respuesta respuesta-noticia d-flex justify-content-between align-items-center flex-wrap"
            }
          >
            {typeof c.description === "string" ? (
              <h6 className="m-0 text-break">{c.description}</h6>
            ) : (
              parseTipTap(c.description)
            )}
            <span className="w-100 text-end mt-3">
              - <b>{renderAuthor(c, user._id)}</b>{" "}
              {moment(new Date(c.createdAt)).fromNow()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderDebates = () => {
    if (debates && debates.length > 0) {
      return debates.map((debate, key) => {
        const fecha = formatFecha(debate.updatedAt);
        const comments_length = debate.comments.filter(
          (c, i) => c.estado === 1 && i > 0
        ).length;
        const { comments } = debate;
        if (
          user.role === "superadmin" ||
          user.role === "supervisor" ||
          user._id === debate.creator ||
          debate.estado === 1
        ) {
          return (
            <div key={key} className="debate">
              <div className="debate-content">
                <div className="d-flex justify-content-between align-items-center">
                  {checkRole(user.role) || debate.estado === 1 ? (
                    <h2 className="text-break pr">
                      <a
                        href={"/opinion/" + debate.slug}
                        className="debate-title"
                      >
                        {debate.title}
                      </a>
                    </h2>
                  ) : (
                    <h2>
                      <span
                        className="debate-title"
                        style={{ cursor: "default" }}
                      >
                        {debate.title}
                      </span>
                    </h2>
                  )}
                </div>
                <small>
                  {`${comments_length} respuestas | ${fecha} | `}
                  <b>{debate.comments[0].author}</b>
                </small>

                {renderRespuestas(comments)}

                {checkRole(user.role) ||
                  (debate.estado === 1 && (
                    <div className="d-flex">
                      <Link href={"/opinion/" + debate.slug}>
                        <a className="button-link mt-4 d-inline-block">
                          Leer todas las respuestas
                        </a>
                      </Link>
                    </div>
                  ))}
              </div>
              {(checkRole(user.role) || debate.estado !== 1) && (
                <div className="estado-container">
                  <div className={classEstado(debate.estado)}>
                    {estado(debate.estado)}
                  </div>
                </div>
              )}
            </div>
          );
        }
      });
    }

    return <h4 className="text-center">No se encontraron opiniones.</h4>;
  };

  const renderCrearDebate = () => {
    return (
      <div className="mw800">
        <h2 className="pb-2">Crear Opinión</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              value={state.title}
              onChange={(e) => handleChange(e)}
              placeholder="Título"
              required
            />
            <label htmlFor="title">Título</label>
          </div>

          <div className="form-floating">
            <textarea
              className="form-control"
              name="description"
              placeholder="Descripción"
              value={state.description}
              onChange={(e) => handleChange(e)}
              required
            />
            <label htmlFor="description">Descripción de la opinión</label>
          </div>

          {error && <p className="error py-2">{error}</p>}

          <button
            type="submit"
            className="enviar-respuesta mt-4"
            disabled={disabled}
          >
            Crear opinión
          </button>
        </form>
      </div>
    );
  };

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    crearOpinion();
  };

  useEffect(() => {
    if (user.accessToken && send && state.title && state.description) {
      crearOpinion();
      setSend(false);
    }
  }, [user, send, state]);

  const crearOpinion = async () => {
    if (user.accessToken) {
      setDisabled(true);
      setError(null);
      try {
        await axios.post("debate", {
          ...state,
          creator: user._id,
          author: user.name,
        });
        setDisabled(false);
        return router.reload();
      } catch (error) {
        setDisabled(false);
        if (error?.response?.data?.slug)
          setError(
            "El título que ha introducido ya corresponde con una opinión existente, por favor pruebe poner otro título."
          );
      }
    } else {
      setShowPopUp(true);
    }
  };

  return (
    <>
      <Head>
        <title>
          Opiniones Macroconcesionario | Macroconcesionario |
          macroconcesionario.com
        </title>
        <meta
          name="description"
          content="Foro de cocheselectricosonline. Aquí encontrarás varias opiniones de otros miembros de la comunidad, novedades acerca de coches eléctricos e híbridos enchufables y más."
        />
      </Head>

      <div className="container pt-4">
        <section
          id="section__top-vehicles"
          className="section__top-vehicles my-4"
        >
          <h1 className="title-red">Opiniones</h1>
          <h2 className="subtitle subtitle-black">
            Tu opinión es importante. Compártela en nuestro foro y debate con
            más amantes de la movilidad sostenible.
          </h2>
          <div className="opiniones w-100 align-self-stretch p-1 p-md-4">
            <p className="text-center">
              <span>Recomendamos leer las </span>
              <Link href="/aviso-legal">
                <a target="blank">condiciones para participar en el foro.</a>
              </Link>
            </p>

            {/* <SorteoAlert /> */}

            <div className="foro-nav">
              <div className="search">
                <Icon icon="search" size="lg" color="#bbb" />
                <input
                  type="text"
                  name="input-search"
                  className="input-search"
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Buscar opinión..."
                  value={searchValue}
                />
                {searchValue && (
                  <Icon
                    icon="times"
                    size="lg"
                    color="#ccc"
                    customClass="pointer"
                    onClick={() => setSearchValue("")}
                  />
                )}
              </div>
              {!showCrearDebate ? (
                <Button
                  icon="plus-circle"
                  iconColor="white"
                  text="Crear Opinión"
                  color="white"
                  bg="#333"
                  onClick={() => setShowCrearDebate(true)}
                />
              ) : (
                <Button
                  icon="tags"
                  iconColor="white"
                  text="Mostrar Opiniones"
                  color="white"
                  bg="var(--dark-grey)"
                  onClick={() => setShowCrearDebate(false)}
                />
              )}
            </div>

            {showCrearDebate ? renderCrearDebate() : renderDebates()}
          </div>
        </section>

        {showPopUp && (
          <LoginPopUp setShowPopUp={setShowPopUp} setSend={setSend} />
        )}
      </div>
    </>
  );
}
