import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Marcas.module.css";
import MarcasJson from "../assets/marcas.json";

const MarcaCard = ({ page }) => {
    const ordenarMarcas = (a, b) => {
        if (a.nombre < b.nombre) return -1;
        if (a.nombre > b.nombre) return 1;
        return 0;
    };
    return (
        <div
            className="row justify-content-center p-2 gap-4"
        >
            {MarcasJson.sort(ordenarMarcas).map((m) => {
                return (
                    <Link key={m.nombre} href={`/marca/${m.nombre.toLowerCase()}`}>
                        <a className={`col-5 col-sm-5 ${page === "inicio" ? "col-lg-2" : "col-lg-3"} p-2 text-decoration-none text-dark marca-link ${styles.marcaLink}`}>
                            <div
                                className={styles.marcaCard}
                            >
                                <Image
                                    alt={m.nombre}
                                    src={`/img/iconosMarca/${m.img}`}
                                    width="80"
                                    height="60"
                                />
                                <h4>{m.nombre}</h4>
                            </div>
                        </a>
                    </Link>
                )
            })}
        </div>
    )
}

export default MarcaCard