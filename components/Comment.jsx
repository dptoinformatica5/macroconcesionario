import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginPopUp from "../components/modals/LoginPopUp";
import { useRouter } from "next/router";
import axios from "../utils/axiosInstance";
import Icon from "./Icon";
import {
  formatFecha,
  classEstado,
  estado,
  checkRole,
  renderAuthor,
} from "../utils/helper";
import moment from "../utils/moment";
import { useRecaptcha } from "./hooks";
import { remember_message } from "../redux/actions";
import TipTap from "./TipTap";
import Image from "next/image";
import ZoomImage from "./ZoomImage";
import SocialNetwork from "./SocialNetwork";

export default function Comment({ debate }) {
  const router = useRouter();
  const { verifyRecaptcha } = useRecaptcha();
  const user = useSelector((state) => state.userReducer);
  const [showPopUp, setShowPopUp] = useState(false);
  const [send, setSend] = useState(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [answerComment, setAnswerComment] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const dispatch = useDispatch();
  const { rememberMessage } = useSelector((state) => state.commentReducer);
  // const shareURL = `https://macroconcesionario.com/opinion/${debate.slug}`;

  useEffect(() => {
    if (files.length > 0) {
      const images = message?.content?.filter((el) => el.type === "image");
      if (!images || images.length <= 0) return setFiles([]);

      files.forEach((file) => {
        const imageExists = images.find(
          (image) => image.attrs.title === file.name
        );
        if (!imageExists) {
          const newFiles = files.filter((f) => f.name !== file.name);
          setFiles(newFiles);
        }
      });
    }
  }, [files, message]);

  useEffect(() => {
    if (
      !message ||
      (message.content.length === 1 &&
        message.content[0].type === "paragraph" &&
        !message.content[0].content)
    ) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [message]);

  useEffect(() => {
    if (rememberMessage) {
      setMessage(rememberMessage);
      dispatch(remember_message(""));
      window.scrollTo(
        0,
        document.querySelector("#deja-tu-respuesta").offsetTop - 150
      );
    }

    if (router.query.comentar) {
      window.scrollTo(
        0,
        document.querySelector("#deja-tu-respuesta").offsetTop - 150
      );
    }

    if (router.query.responder) {
      const comment = debate.comments.find((c) => c._id);
      if (comment) {
        window.scrollTo(
          0,
          document.querySelector("#deja-tu-respuesta").offsetTop - 150
        );
        setAnswerComment(comment);
      }
    }
  }, []);

  useEffect(() => {
    if (user.accessToken && send && message) {
      postComment();
      setSend(false);
    }
  }, [user, send, message]);

  const postComment = async () => {
    dispatch(remember_message(message));
    if (!user.accessToken) return setShowPopUp(true);

    setDisabled(true);
    setIsLoading(true);
    try {
      const verify = await verifyRecaptcha();
      if (verify.status === true) {
        const body = {
          creator: user._id,
          creator_email: user.email,
          author: user.name,
          description: message,
          cita: answerComment,
        };

        let copyFiles = [...files];
        for (let i = 0; i < message.content.length; i++) {
          const el = message.content[i];
          if (el.type === "image") {
            const fileName = Date.now() + "-" + el.attrs.title;
            el.attrs.src = fileName;
            copyFiles = copyFiles.map((cf) => {
              if (cf.name === el.attrs.title) {
                const renamedFile = new File([cf], fileName);
                return renamedFile;
              }
              return cf;
            });
            message.content[i] = el;
          }
        }

        const formData = new FormData();
        for (var i = 0; i < copyFiles.length; i++) {
          formData.append("img", copyFiles[i]);
        }
        formData.append("data", JSON.stringify(body));
        const { data } = await axios.post(`comment/${debate._id}`, formData);
        setIsLoading(false);

        if (data.debate) {
          setMessage("");
          setFiles([]);
          setAnswerComment(null);
          dispatch(remember_message(""));
          return router.push(router.asPath);
        }
      }
      setAnswerComment(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response?.data || error);
    }
  };

  const handleAnswerComment = (comment) => {
    setAnswerComment(comment);
    goToElement(document.querySelector("#deja-tu-respuesta"));
  };

  const goToCita = (cita) => {
    const el = document.getElementById(cita._id);
    goToElement(el);
  };

  const goToElement = (el) => window.scrollTo(0, el.offsetTop - 150);

  const parseTipTap = ({ content }, isCita = false) => {
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
        //return <p key={i} className="m-0 text-break w-100 pb-2">{c.content[0].text}</p>;
      }
      if (c.type === "image") {
        return (
          <div
            key={i}
            className="unset-img"
            style={!isCita ? { maxWidth: "500px" } : {}}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_Macroconcesionario_API_STATIC_URI}img/comentarios/${c.attrs.src}`}
              alt={c.attrs.alt}
              className="custom-img custom-img-comment"
              layout="fill"
              onClick={() => !isCita && setZoomImage(c.attrs)}
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

  const renderRespuestas = () => {
    const comments = debate.comments.filter(
      (c, i) => i < debate.comments.length - 1
    );
    let respuestas = comments.filter((c) => c.estado === 1).length;
    if (respuestas === 0) {
      respuestas = "No hay respuestas";
    } else {
      respuestas =
        respuestas === 1 ? "1 respuesta" : respuestas + " respuestas";
    }
    return (
      <div className="debate-respuestas">
        <h4 className="debate-respuestas-title">{respuestas}</h4>
        {comments.map((comment) => {
          if (
            checkRole(user.role) ||
            user._id === comment.creator ||
            comment.estado === 1
          ) {
            return (
              <div key={comment._id} id={comment._id}>
                <div className="respuesta d-flex justify-content-between align-items-center flex-wrap">
                  {comment.cita && (
                    <div className="cita-respuesta-container">
                      <Icon
                        icon="reply"
                        customClass="pointer"
                        title="ir a la cita"
                        onClick={() => goToCita(comment.cita)}
                      />
                      <p className="m-0 mb-2">
                        Cita de: <strong>{comment.cita.author}</strong>
                      </p>
                      <div
                        className="m-0 mb-4 w-100 text-break"
                        style={{ paddingLeft: ".8rem" }}
                      >
                        {typeof comment.cita.description === "string" ? (
                          <p className="m-0 text-break w-100">
                            {comment.cita.description}
                          </p>
                        ) : (
                          parseTipTap(comment.cita.description)
                        )}
                      </div>
                    </div>
                  )}

                  {typeof comment.description === "string" ? (
                    <p className="m-0 text-break w-100 pb-2">
                      {comment.description}
                    </p>
                  ) : (
                    parseTipTap(comment.description)
                  )}

                  <div className="respuesta-wrapper w-100 text-end mt-3">
                    <span className="text-right">
                      - <b>{renderAuthor(comment, user._id)}</b>{" "}
                      {moment(new Date(comment.createdAt)).fromNow()}
                    </span>
                    {comment.estado === 1 && (
                      <span
                        className="responder"
                        onClick={() => handleAnswerComment(comment)}
                      >
                        - Responder
                      </span>
                    )}
                    {(checkRole(user.role) ||
                      (user._id === comment.creator &&
                        comment.estado !== 1)) && (
                      <div className="d-flex justify-content-end p-2">
                        <div className="estado-container d-flex justify-content-start">
                          <div className={classEstado(comment.estado)}>
                            {estado(comment.estado)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="debate-single w-100 p-4">
      {(user.role === "superadmin" ||
        (user._id === debate.creator && debate.estado !== 1)) && (
        <div className="estado-container d-flex justify-content-start mb-4">
          <div className={classEstado(debate.estado)}>
            {estado(debate.estado)}
          </div>
        </div>
      )}
      <h2 className="debate-single-title text-break">{debate.title}</h2>
      <small>
        <b>{debate.comments[debate.comments.length - 1].author}</b> |{" "}
        {formatFecha(debate.createdAt)}
      </small>
      <hr />
      {typeof debate.comments[debate.comments.length - 1].description ===
      "string" ? (
        <p className="debate-description">
          {debate.comments[debate.comments.length - 1].description}
        </p>
      ) : (
        parseTipTap(debate.comments[debate.comments.length - 1].description)
      )}

      {renderRespuestas()}

      <div className="responder-container">
        <h4 className="debate-respuestas-title" id="deja-tu-respuesta">
          Deja tu respuesta
        </h4>
        <div className="debate-responder-container">
          {answerComment && (
            <div className="cita-container flex-wrap">
              <Icon icon="reply" />
              <p className="text-break mb-2">
                Respondiendo a: <strong>{answerComment.author}</strong>
              </p>
              <div
                title="quitar cita"
                className="quitar-cita"
                onClick={() => setAnswerComment(null)}
              >
                <Icon icon="times" />
              </div>
              {typeof answerComment.description === "string" ? (
                <p
                  className="m-0 mb-4 w-100 text-break"
                  style={{ paddingLeft: ".8rem" }}
                >
                  {answerComment.description}
                </p>
              ) : (
                parseTipTap(answerComment.description, true)
              )}
            </div>
          )}
          <TipTap setMessage={setMessage} setFiles={setFiles} />
        </div>

        <div className="d-flex justify-content-end align-items-center mt-4">
          <button
            className="enviar-respuesta"
            onClick={postComment}
            disabled={disabled}
          >
            {!isLoading ? (
              <>
                <span>Enviar respuesta</span>
              </>
            ) : (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </div>
      </div>

      <SocialNetwork shareURL={shareURL} />

      {zoomImage && <ZoomImage image={zoomImage} setZoomImage={setZoomImage} />}
      {showPopUp && (
        <LoginPopUp
          isActive={showPopUp}
          setShowPopUp={setShowPopUp}
          setSend={setSend}
        />
      )}
    </div>
  );
}
