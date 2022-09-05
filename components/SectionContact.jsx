import Link from "next/link";
import Button from "./Button";

export default function SectionContact() {
  return (
    <section className="btn-contact_section" id="contacto">
      <h3 className="text-center">
        ¿Interesado en comprar un coche eléctrico?
      </h3>
      <p className="my-4 text-center">
        Nuestros agentes estarán encantados de atenderte y asesorarte sobre todo
        lo relacionado con la compra de tu vehículo eléctrico; modelos
        disponibles, parámetros técnicos o la instalación de un punto de
        recarga. ¡Infórmate sin compromiso ahora!
      </p>

      <Link href="/contact">
        <a title="contacta con nosotros acerca de cualquier coche eléctrico">
          <Button customClass="btn-contact" text="Contacta con Nosotros" />
        </a>
      </Link>
    </section>
  );
}
