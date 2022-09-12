import Link from "next/link";
import Button from "./Button";

export default function SectionContact() {
  return (
    <section className="btn-contact_section" id="contacto">
      <h3 className="text-center">
        ¿Necesitas comprar un vehículo o maquinaria?
      </h3>
      <p className="my-4 text-center">
        Nuestros asesores te conectarán a la mayor brevedad posible para
        proporcionarte toda la información que necesitas para gestionar la
        compra con nosotros.
      </p>

      <Link href="/contact">
        <a title="contacta con nosotros acerca de cualquier coche eléctrico">
          <Button customClass="btn-contact" text="Contacta con Nosotros" />
        </a>
      </Link>
    </section>
  );
}
