import Accordion from "react-bootstrap/Accordion";

function Acordion() {
  return (
    <>
      <div>
        <h3 className="section_team2">¿Cómo funciona Macroconcesionario?</h3>
        <p>
          Simplemente. Elige el vehículo, ya sea eléctrico, de combustión o
          híbrido. Formalizamos el proceso de compra/venta, lo registramos y se
          lo entregamos de acuerdo al plazo que usted elija.
        </p>
        <h3 className="section_team2">
          ¿Cómo funciona la garantía de reembolso?
        </h3>
        <p>
          Si simplemente no le gusta el vehículo, puede devolvérnoslo dentro de
          los 14 días posteriores a su recepción.
        </p>
      </div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header class="accordion-button:not">
            ¿Realmente puedo devolver el coche?
          </Accordion.Header>
          <Accordion.Body>
            Por supuesto que puede. Confiamos en nuestro servicio y sabemos que
            solo vendemos vehículos ​​en excelentes condiciones técnicas.{" "}
            <br></br> Y si simplemente no te gusta el coche, puedes
            devolvérnoslo hasta 14 días después de haberlo recibido.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>¿Tienen compra segura?</Accordion.Header>
          <Accordion.Body>
            Inspeccionamos cuidadosamente cada automóvil y garantizamos que esté
            en buenas condiciones antes de la compra. Realizamos el trámite de
            la ITV y de matriculación antes de la entrega. Puede pagar
            cómodamente a 3 cuotas sin intereses, sujeto a estudio previo de
            nuestro departamento de riesgo. Sea cual sea el origen del vehículo,
            siempre realiza el pago con nosotros directamente.
          </Accordion.Body>
        </Accordion.Item>
        <div className="section_team2" style={{ paddingTop: 40 }}>
          <h3>¿Existe algún riesgo comprar a través de esta plataforma?</h3>
          <p>
            Somos la forma más segura de comprar el vehículo que necesitas.
            Siempre contará con el respaldo del contrato de encargo de
            Macroconcesionario, por lo que todas las garantías las
            proporcionamos nosotros y la casa oficial del vehículo.
          </p>
        </div>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            ¿Cómo funciona la garantía de recompra?
          </Accordion.Header>
          <Accordion.Body>
            Además, con cada vehículo recibe una garantía extendida de 12 meses
            por el mismo precio que ha pagado. Quiere decir, que puede revender
            el vehículo a Macroconcesionario o simplemente cambiarlo por otro
            aportando la parte proporcional del precio de venta antes del primer
            año. <br></br> Para una mayor tranquilidad, además de la garantía de
            14 días de reembolso, también dispone de una garantía ampliada de
            recompra para revendernos su vehículo o comprar otro modelo
            aportando la diferencia de precio antes de los 12 meses.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            ¿Cómo funciona el proceso de devolución de acuerdo con la garantía?
          </Accordion.Header>
          <Accordion.Body>
            Siempre obtendrá la garantía de la casa oficial después de la
            compra. Sin embargo, para su comodidad, las devoluciones de
            vehículos se organizan a través de nosotros, y no con la casa
            oficial.
          </Accordion.Body>
        </Accordion.Item>
        <h3 className="section_team2" style={{ paddingTop: 40 }}>
          ¿Cómo es el proceso de matriculación?
        </h3>
        <p>
          Antes de la matriculación del vehículo, avisamos al cliente para
          formalizar la revisión. Una vez se haya matriculado, comienza a surtir
          efecto la garantía.{" "}
        </p>
        <Accordion.Item eventKey="3">
          <Accordion.Header>¿Dónde entregarán mi vehículo?</Accordion.Header>
          <Accordion.Body>
            ¿Quieres que te entreguemos el vehículo en tu empresa, trabajo, en
            tu casa? La decisión es tuya y solo tuya. Te enseñaremos el
            vehículo, te entregaremos las llaves y la documentación y por fin
            podrás empezar a usarlo. Los gastos de transporte están incluidos en
            el precio del vehículo.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            ¿Cuánto tardarán en entregar el vehículo?
          </Accordion.Header>
          <Accordion.Body>
            Desde 1 mes hasta 6 meses. Según el plazo de entrega que elija el
            cliente.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Acordion;
