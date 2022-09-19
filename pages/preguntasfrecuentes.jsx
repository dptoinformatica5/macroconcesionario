import Acordion from "../components/Acordion";
import Garantias from "../components/Garantias";

export default function PreguntasFrecuentes() {
  return (
    <>
      <div className="container">
        <section className="section_team">
          <h1 className="title title-red">Preguntas Frecuentes</h1>
          <div className="content text-left" style={{ paddingTop: 30 }}>
            <Acordion />
            <div>
              <Garantias />
            </div>
          </div>
        </section>
        {/*<section>
          <div className="my-3">
            <h4>garantia</h4>
          </div>
          <div className="row justify-content-center p-2 gap-4">
            <h4>compra</h4>
          </div>
          </section>*/}
      </div>
    </>
  );
}
