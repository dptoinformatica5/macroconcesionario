import axios from "../../utils/axiosInstance";
import { classEstado, estado } from "../../utils/helper";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "../../utils/moment";
import { useRouter } from "next/router";

export default function Opinion() {
  const router = useRouter();
  const user = useSelector((state) => state.userReducer);
  const [isAdmin, setIsAdmin] = useState(false);
  const [debate, setDebate] = useState(null);

  useEffect(() => fetchDebate(), []);

  useEffect(() => {
    if (user.accessToken) {
      if (user.role === "superadmin" || user.role === "supervisor") {
        return setIsAdmin(true);
      }
      return router.push("/");
    }
  }, [user]);
  const fetchDebate = async () => {
    try {
      const { data } = await axios("debate/" + router.query.d);
      return setDebate(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const cambiarEstado = async (e, c) => {
    const estado = parseInt(e.target.dataset.estado);
    if (c.estado !== estado) {
      try {
        await axios.patch("debate/" + debate._id, {
          estado,
          action: "estado_comentario",
          comment_id: c._id,
        });
        fetchDebate();
      } catch (error) {
        console.log(error.response?.data || error);
      }
    }
  };

  const parseTipTap = ({ content }) => {
    return content.map((c, i) => {
      if (c.type === "paragraph" && c.content?.length > 0) {
        return (
          <p key={i} className="m-0 text-break w-100 pb-2">
            {c.content[0].text}
          </p>
        );
      }
      if (c.type === "image") {
        return (
          <p key={i} className="m-0 text-break w-100 pb-2">
            {c.attrs.alt}
          </p>
        );
      }
    });
  };

  return (
    <>
      {isAdmin && (
        <div className="container">
          <h2 className="text-center my-4">
            <b>Opinion:</b>
            <span className="ms-4 text-decoration-underline">
              {debate?.title}
            </span>
          </h2>
          <table className="table mt-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ip</th>
                <th scope="col">autor</th>
                <th scope="col">description</th>
                <th className="celda-fecha" colSpan="2">
                  Fecha
                </th>
                <th scope="col">estado</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {debate?.comments.map((c, i) => (
                <tr key={i}>
                  <th scope="row">{c.ip}</th>
                  <td>{c.author}</td>
                  <td>
                    {typeof c.description === "string"
                      ? c.description
                      : parseTipTap(c.description)}
                  </td>
                  <td className="celda-fecha" colSpan="2">
                    {moment(new Date(c.createdAt)).fromNow()}
                  </td>
                  <td>
                    <div className="d-flex">
                      <div className={classEstado(c.estado)}>
                        {estado(c.estado)}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-outline-danger mx-1"
                        data-estado={2}
                        onClick={(e) => cambiarEstado(e, c)}
                      >
                        no publicar
                      </button>
                      <button
                        className="btn btn-outline-success mx-1"
                        data-estado={1}
                        onClick={(e) => cambiarEstado(e, c)}
                      >
                        publicar
                      </button>
                      <button
                        className="btn btn-outline-warning mx-1"
                        data-estado={0}
                        onClick={(e) => cambiarEstado(e, c)}
                      >
                        revisar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
