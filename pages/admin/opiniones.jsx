import axios from "../../utils/axiosInstance";
import { classEstado, estado } from "../../utils/helper";
import moment from "../../utils/moment";
import router from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export default function Opiniones() {
  const user = useSelector((state) => state.userReducer);
  const [isAdmin, setIsAdmin] = useState(false);
  const [debates, setDebates] = useState([]);

  useEffect(() => fetchDebates(), []);

  useEffect(() => {
    if (user.accessToken) {
      const decoded = jwt_decode(user.accessToken);
      if (decoded.role === "superadmin" || decoded.role === "supervisor") {
        return setIsAdmin(true);
      }
      return router.push("/");
    }
  }, [user]);

  const fetchDebates = async () => {
    try {
      const { data } = await axios("/debates");
      setDebates(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const cambiarEstado = async (e, d) => {
    const estado = parseInt(e.target.dataset.estado);
    if (d.estado !== estado) {
      try {
        await axios.patch("debate/" + d._id, {
          estado,
          action: "estado_opinion",
        });
        fetchDebates();
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  const handleClick = (e, slug) => {
    if (e.target.dataset.estado) return;
    return router.push(`/admin/opinion?d=${slug}`);
  };

  /*const search = value => {
        const res = debates.filter(d => d.title.includes(value));
        console.log(res);
        if(res.length > 0 && value) {
            return setDebates(res);
        }
        fetchDebates();
    }*/

  return (
    <>
      {isAdmin && (
        <div className="container">
          <h2 className="text-center my-4">Opiniones</h2>
          {/* <div className="search" onChange={e => search(e.target.value)}>
                    <Icon icon="search" size="lg" color="#bbb" />
                    <input type="text" name="input-search" className="input-search" placeholder="Buscar opinión..." />
                </div> */}

          <table className="admin-table table mt-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">title</th>
                <th className="celda-fecha" colSpan="2">
                  Fecha
                </th>
                <th scope="col">estado</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {debates.map((d, i) => (
                <tr
                  className="pointer"
                  key={i}
                  onClick={(e) => handleClick(e, d.slug)}
                >
                  <th className="text-break">{d.title}</th>
                  <td className="celda-fecha" colSpan="2">
                    {moment(new Date(d.createdAt)).fromNow()}
                  </td>
                  <td>
                    <div className="d-flex">
                      <div className={classEstado(d.estado)}>
                        {estado(d.estado)}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-outline-danger mx-1"
                        data-estado={2}
                        onClick={(e) => cambiarEstado(e, d)}
                      >
                        no publicar
                      </button>
                      <button
                        className="btn btn-outline-success mx-1"
                        data-estado={1}
                        onClick={(e) => cambiarEstado(e, d)}
                      >
                        publicar
                      </button>
                      <button
                        className="btn btn-outline-warning mx-1"
                        data-estado={0}
                        onClick={(e) => cambiarEstado(e, d)}
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
