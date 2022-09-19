import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setSelectedVehicle } from "../redux/actions";
import { useRef } from "react";
import placeholderImage from "../assets/placeholderImage";
import vehicles from "../assets/vehiclesCombustion.json";

export default function Calculate() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [query, setQuery] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [plazo, setPlazo] = useState(12); //en semanas
  const [precio, setPrecio] = useState(null);
  const refImage = useRef();
  const promocion = "Hyundai Ioniq 5";

  useEffect(() => {
    const { vid, promocion } = router.query;

    if (promocion) return setQuery("promocion");

    if (vid) return setQuery(vid);
  }, [router]);

  useEffect(() => {
    if (query === undefined) return router.push("/");

    if (query === "promocion")
      return setVehicle(vehicles.find((v) => v.vehicle_name === promocion));

    if (query) setVehicle(vehicles.find((v) => v.id === query));
  }, [query]);

  useEffect(() => {
    if (vehicle !== null) {
      if (vehicle === undefined) return router.push("/");

      setPrecio(parseInt(vehicle.basePrice));

      if (vehicle.plazo_custom) setPlazo(vehicle.plazo_custom * 4);
    }
  }, [vehicle]);

  useEffect(() => {
    const calcular = () => {
      const basePrice = parseInt(vehicle.basePrice);
      let aux = basePrice;
      const semana_antes = basePrice * 0.02583;
      const semana_despues = basePrice * 0.0075;
      if (vehicle?.plazo_custom !== undefined) {
        setPrecio(aux);
        return;
      }
      if (plazo < 12) {
        for (let i = plazo; i <= 12; i++) {
          aux += semana_antes;
        }
      } else if (plazo > 12) {
        for (let i = plazo; i > 12; i--) {
          aux -= semana_despues;
        }
      }
      setPrecio(aux);
    };

    if (vehicle && plazo && precio) calcular();
  }, [plazo]);

  const plazoFormatted = () => {
    let res = "Plazo no disponible";
    if (plazo) {
      switch (parseInt(plazo)) {
        case 4:
          res = "1 mes";
          break;
        case 8:
          res = "2 meses";
          break;
        case 12:
          res = "3 meses";
          break;
        case 16:
          res = "4 meses";
          break;
        case 20:
          res = "5 meses";
          break;
        case 24:
          res = "6 meses";
          break;
      }
    }

    return res;
  };

  const priceFormatted = () => {
    if (precio) {
      const formatted = precio
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `${formatted} €`;
    }

    return "No disponible";
  };

  const handleChange = (e) => setPlazo(parseInt(e.target.value));

  const continuar = async () => {
    const formattedPrice = priceFormatted();
    const formattedPlazo = plazoFormatted();
    const imageFormatted = refImage.current.children[0].lastChild.src;
    dispatch(
      setSelectedVehicle({
        ...vehicle,
        precioFormatted: formattedPrice,
        plazoFormatted: formattedPlazo,
        imageFormatted,
        precio,
        plazo,
      })
    );

    return router.push("/contact");
  };
  return (
    <>
      <Head>
        <title>
          Calcular precio | Macroconcesionario: Macroconcesionario |
          macroconcesionario.com
        </title>
        <meta
          name="description"
          content="Calcula el precio del coche eléctrico que te interesa según el plazo de entrega."
        />
      </Head>

      <div className="container py-5">
        <h2 className="title text-center h2">
          ¿EL SECRETO DE NUESTROS PRECIOS? QUE NO HAY SECRETO
        </h2>
        <h3 className="text-center my-4 text-dark">
          Tú mismo eliges el dinero que quieres pagar por el coche
        </h3>
        <h4 className="text-center my-4 text-dark">{`Calcula el precio final del ${vehicle?.vehicle_name}`}</h4>

        <div
          ref={refImage}
          className="img-vehicle-wraper contact-image-wrapper"
        >
          {vehicle?.promocion && (
            <div className="promocion">
              <span>{vehicle?.promocion}</span> dto.
            </div>
          )}
          <Image
            src={`/img/${vehicle?.img}`}
            className="img-vehicle"
            alt={
              "Macroconcesionario- calcular precio del vehículo " +
              vehicle?.vehicle_name
            }
            objectFit={vehicle?.promocion ? "cover" : "contain"}
            layout="fill"
            placeholder="blur"
            blurDataURL={placeholderImage}
          />
        </div>

        <h2 className="subtitle mt-4 text-center text-dark w-100">
          Elige el plazo de entrega que deseas:
        </h2>

        {vehicle?.plazo_custom && vehicle?.mostrar_alerta_plazo && (
          <div className="alert alert-warning mt-4">
            Este vehículo solo cuenta con un plazo de entrega de{" "}
            {vehicle?.plazo_custom} meses.
          </div>
        )}

        <div className="calculadora py-3">
          <select value={plazo} className="form-select" onChange={handleChange}>
            {vehicle?.plazo_custom ? (
              <option value={vehicle?.plazo_custom * 4}>
                {vehicle?.plazo_custom} meses
              </option>
            ) : (
              <>
                <option value={4}>1 mes</option>
                <option value={8}>2 meses</option>
                <option value={12}>3 meses</option>
                <option value={16}>4 meses</option>
                <option value={20}>5 meses</option>
                <option value={24}>6 meses</option>
              </>
            )}
          </select>

          <div className="precio mt-4">
            <h3 className="text-secondary text-center">
              Precio: <strong className="text-dark">{priceFormatted()}</strong>
            </h3>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button onClick={continuar} className="img-contact-btn">
              Continuar
            </button>
          </div>
        </div>

        <p className="mt-4 text-center">
          {vehicle?.texto_alternativo ? (
            <b>{vehicle?.texto_alternativo}</b>
          ) : (
            <b>
              *Recomendación: si no necesitas con urgencia el vehículo, la
              opción de 6 meses es la más factible y viable
            </b>
          )}
        </p>

        <p className="mt-4 text-center h5">
          <em>
            “La paciencia y el tiempo hacen más que la fuerza o la pasión”
          </em>
          <br />
          <br />
          Jean de La Fontaine
        </p>
      </div>
    </>
  );
}
