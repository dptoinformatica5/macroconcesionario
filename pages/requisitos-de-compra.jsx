import Head from "next/head";

export default function purchase_requirements() {
  return (
    <>
      <Head>
        <title>
          Requisitos de compra | Macroconcesionario: Macroconcesionario |
          macroconcesionario.com
        </title>
        <meta
          name="description"
          content="Requisitos de compra CochesElectricosOnline"
        />
      </Head>

      <div className="container">
        <section
          className="w-100 mx-auto mt-4 p-2"
          style={{ maxWidth: "1000px" }}
        >
          <h1 className="title title-red w-100 text-center">
            Requisitos de compra
          </h1>
          <h2 className="h5" style={{ fontWeight: "normal" }}>
            Como política de compra y para evitar la especulación de la venta de
            nuestros vehículos eléctricos será indispensable el cumplimiento de
            los siguientes requisitos:
          </h2>
          <ul
            className="mt-4 justify-self-start"
            style={{ color: "var(--dark-grey)" }}
          >
            <li>No se puede comprar más de un coche al año.</li>
            <li>No se puede vender coches a concesionarios.</li>
            <li>
              El cliente deberá facilitar la información necesaria para
              verificar que cumple los dos requisitos anteriores.
            </li>
            <li>
              Si ya es cliente, deberá indicar en el formulario de contacto su
              número de socio.
            </li>
            <li>
              En caso de no ser cliente, para poder brindarle una atención
              personalizada, es necesario cumplimentar los datos personales
              requeridos en el formulario de contacto.{" "}
            </li>
          </ul>

          <div>
            <h3 className="mt-5">Métodos de pago NO aceptados</h3>
            <p>
              Existen ciertos métodos de pago que no puedes utilizar en
              macroconcesionario.com
            </p>
            <hr />
            <p className="mt-3">No aceptamos los siguientes métodos de pago:</p>
            <ul
              className="mt-2 justify-self-start"
              style={{ color: "var(--dark-grey)" }}
            >
              <li>PayPal</li>
              <li>Cheques o giros postales</li>
              <li>Pagos en efectivo en cualquier divisa</li>
              <li>Pagarés</li>
              <li>Pagos contra reembolso</li>
            </ul>

            <h3 className="mt-5">Métodos de pago aceptados</h3>
            <p>
              En macroconcesionario.com hay una forma de pago disponible para su
              uso:
            </p>
            <ul
              className="mt-2 justify-self-start"
              style={{ color: "var(--dark-grey)" }}
            >
              <li>Transferencia bancaria</li>
              <li>Financiación en 3 cuotas sin intereses</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
