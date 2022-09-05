import Marcas from "../assets/marcas.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setSelectedVehicle } from "../redux/actions";
import placeholderImage from "../assets/placeholderImage";

export default function Vehicles({ vehicles, isRankingPage = false }) {
  console.log(vehicles);
  const router = useRouter();
  const dispatch = useDispatch();
  const [state, setState] = useState({ marca: "" });

  useEffect(() => {
    if (!isRankingPage && state.marca) {
      router.push(`/marca/${state.marca.toLowerCase()}`);
    }
  }, [state]);

  const handleClick = (v) => router.push("/calcular?vid=" + v.id);

  const handleChange = (e) => {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const ordenarMarcas = (a, b) => {
    if (a.nombre < b.nombre) return -1;
    if (a.nombre > b.nombre) return 1;
    return 0;
  };

  const marcasOptions = () =>
    Marcas.sort(ordenarMarcas).map((m) => (
      <option key={m.nombre} value={m.nombre}>
        {m.nombre}
      </option>
    ));

  return (
    <>
      {!isRankingPage && (
        <div className="w-100 mt-5 d-flex justify-content-end align-items-center p-4">
          <select
            className="form-select mx-1"
            style={{ maxWidth: "200px" }}
            name="marca"
            value={state.marca}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="">Todas las marcas</option>
            {marcasOptions()}
          </select>
        </div>
      )}

      {vehicles.map((v, i) => (
        <article key={i} className="p-md-4">
          <h3>{v.vehicle_name}</h3>
          <div className="img-vehicle-wraper">
            {v.promocion && (
              <div className="promocion">
                <span>{v.promocion}</span> dto.
              </div>
            )}
            <Image
              src={`/img/${v.img}`}
              alt={"Macroconcesionario- " + v.vehicle_name}
              className="img-vehicle"
              width={750}
              height={500}
              layout="responsive"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={placeholderImage}
            />
            <div className="vehicle-contact">
              <h4 className="mb-3">¿Te interesa?</h4>
              <p className="mb-3 text-center">
                ¡Pincha para descubrir el precio de este vehículo!
              </p>
              <button
                className="img-contact-btn"
                onClick={() => handleClick(v)}
              >
                Calcular
              </button>
            </div>
          </div>
          <ul className="vehicle-description">
            <li>{`Autonomía: ${v.autonomia}.`}</li>
            <li>{`Potencia y velocidad: ${v.potencia_velocidad}.`}</li>
          </ul>
        </article>
      ))}
    </>
  );
}
