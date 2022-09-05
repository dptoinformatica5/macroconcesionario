import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Button from "../components/Button";

export default function About() {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Head>
        <title>
          Sobre Nosotros - Macroconcesionario | macroconcesionario.com
        </title>
        <meta
          name="description"
          content="Macroconcesionario(Macroconcesionario) es una empresa dedicada a la venta de vehículos eléctricos e híbridos enchufables. "
        />
      </Head>

      <div className="header">
        <h1 className="title">Nuestra Misión</h1>
        <h2 className="subtitle">
          ¿Es posible hacer una buena inversión con la compra de un vehículo
          eléctrico y, además, beneficiarse y salir ganando?
          <br />
          Sí, te explicamos cómo y por qué.
        </h2>
      </div>
      <div className="container">
        <section className="section_team">
          <div className="content text-left">
            <p className="vehicle-description">
              Un coche pierde un 10% de su valor en el minuto 1 de conducirlo
              fuera del concesionario. Por lo tanto,{" "}
              <b>
                los coches pierden un valor de entre 15% y 25% durante el
                primero año, llegando incluso a depreciarse un 50% en algunos
                casos.
              </b>
            </p>
            <p className="vehicle-description">
              En definitiva,{" "}
              <b>
                la devaluación de un coche empieza en el momento en el que sale
                del concesionario.
              </b>{" "}
              Y asumámoslo, no hay nada que se pueda hacer para evitar esta
              depreciación.
            </p>
            <p className="vehicle-description">
              Sin embargo, sí hay un modo de{" "}
              <b>beneficiarse de esta devaluación,</b> y hacer de una compra de
              un vehículo, una buena inversión. ¿Cuál? Anticiparse, ¿cómo?{" "}
              <b>Comprando el vehículo antes de que salga del concesionario.</b>
            </p>
            <div className={`${!showMore ? "d-none" : null}`}>
              <p className="vehicle-description">
                Y ahí es cuando entramos nosotros, poniendo en marcha nuestra
                misión:{" "}
                <b>
                  que adquieras un vehículo nuevo con el precio de uno de
                  segunda mano,
                </b>{" "}
                haciendo lo que se conoce como <em>una compra inteligente</em>.
                Disponiendo de una garantía de devolución establecida por ley de
                14 días.
              </p>
              <p className="vehicle-description">
                Esta propuesta de valor es la que nos permite tener los precios
                más competitivos de mercado. Este es el secreto, no secreto, de
                nuestros precios. Comercializamos y exportamos coches de
                presentación y exposición bajo pedido. Ahorrando así, costes en
                instalaciones de concesionarios, remesas de vehículos y demás
                gastos propios de los concesionarios tradicionales.
              </p>
            </div>

            <Button
              customClass="btn-leer-mas"
              text={!showMore ? "Leer más" : "Ocultar"}
              onClick={() => setShowMore((prev) => !prev)}
            />
          </div>
        </section>

        <section className="section_team">
          <h3 className="title-red">Nuestra Visión</h3>
          <div className="content text-left">
            <p className="vehicle-description">
              Queremos <b> impulsar la sostenibilidad</b> y, además,{" "}
              <b>
                lograr una democratización de precios en el sector
                automovilístico.{" "}
              </b>
              Por ello, y para conseguir una mayor fidelización y evitar el
              fraude de la reventa, te ofrecemos nuestra{" "}
              <b>garantía de recompra.</b> Nosotros mismos te compramos el
              vehículo por el mismo precio al que lo adquiriste, siempre y
              cuando no haya pasado 1 año desde su compra.
            </p>
          </div>
        </section>

        <section className="section_team">
          <h3 className="title-red">Nuestros Valores</h3>
          <div className="content text-left">
            <p className="vehicle-description">
              <b>Responsabilidad social:</b> queremos mejorar la calidad de vida
              de nuestros clientes. Por ello, tenemos un compromiso tanto
              social, como ecológico. De ahí que prescindamos de los
              concesionarios tradicionales, con el fin de erradicar los impactos
              negativos que estos generan en el medioambiente.
            </p>
            <p className="vehicle-description">
              <b>Honestidad:</b> somos 100% transparentes y sinceros contigo.
              Tanto es así, que te explicamos todo el proceso de compra de
              manera clara, sin trucos ni engaños. Así mismo, si quieres obtener
              más información, te invitamos a que te pongas en contacto con
              nosotros, estamos a tu entera disposición.
            </p>
            <p className="vehicle-description">
              <b>Calidad:</b> nuestros colaboradores están en la constante
              búsqueda de los mejores coches de presentación, con el fin de que
              nuestros clientes adquieran un vehículo con la máxima calidad.
              Pero una cosa es afirmarlo y otra garantizarlo, nosotros te lo
              garantizamos.
            </p>
            <p className="vehicle-description">
              <b>Trabajo en equipo:</b> contamos con un equipo multidisciplinar
              con una amplia experiencia en el sector que disfruta de lo que
              hace. Factor fundamental que hace que luchemos día a día por
              mejorar lo que ofrecemos.
            </p>
            <p className="vehicle-description">
              <b>Orientación al cliente::</b> somos conscientes de que nosotros
              existimos porque nuestros clientes nos eligen, por lo que son el
              eje central de nuestra empresa. Por eso, los escuchamos y nos
              adaptamos a sus necesidades.
            </p>
            <p className="vehicle-description">
              <b>Innovación:</b> estamos viviendo nuevos tiempos en los que cada
              vez es más difícil innovar, pero nosotros lo tenemos claro; la
              clave está en reinventarse. Por lo que estamos en un continuo
              proceso de evolución, creciendo y mejorando.
            </p>
          </div>
        </section>

        <section className="section_team">
          <h3 className="title-red">SERVICIOS</h3>
          <h4 className="mb-5">
            Combina nuestras soluciones y multiplica tu eficiencia y
            rentabilidad.
          </h4>
          <div className="servicios-container mt-4">
            <div className="servicio mx-4 px-4 pb-4">
              <div className="img-servicio d-flex flex-column justify-content-center">
                <Image
                  src="/img/asesoramiento-icono.svg"
                  alt="asesoramiento"
                  layout="fill"
                />
              </div>
              <h3 className="h3">Asesoramiento</h3>
              <p className="vehicle-description text-center">
                Te ayudamos a resolver cualquier cuestión relacionada con la
                movilidad eléctrica.
              </p>
            </div>
            <div className="servicio mx-4 px-4 pb-4">
              <div className="img-servicio d-flex flex-column justify-content-center">
                <Image
                  src="/img/gestion-icono.svg"
                  alt="gestion"
                  layout="fill"
                />
              </div>
              <h3 className="h3">Gestión</h3>
              <p className="vehicle-description text-center">
                Nos encargamos de todos los trámites de compra y matriculación
                del vehículo.
              </p>
            </div>
            <div className="servicio mx-4 px-4 pb-4">
              <div className="img-servicio d-flex flex-column justify-content-center">
                <Image
                  src="/img/transporte-icono.svg"
                  alt="transporte"
                  layout="fill"
                />
              </div>
              <h3 className="h3">Transporte</h3>
              <p className="vehicle-description text-center">
                Te entregamos el vehículo cuándo y dónde quieras, sin coste
                alguno.
              </p>
            </div>
            <div className="servicio mx-4 px-4 pb-4">
              <div className="img-servicio d-flex flex-column justify-content-center">
                <Image
                  src="/img/recarga-icono.svg"
                  alt="Puntos de recarga"
                  layout="fill"
                />
              </div>
              <h3 className="h3">Puntos de recarga</h3>
              <p className="vehicle-description text-center">
                Te instalamos el punto de recarga Wallbox que necesites para tu
                vehículo
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
