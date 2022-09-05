import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function AccountModal({ showModal, setShowModal, error }) {
    return (
        <Rodal visible={showModal} onClose={() => setShowModal(false)}>
            <div className="text-center">
                <h2>{error ? 'Error al crear la cuenta' : '¡Cuenta creada!'}</h2>
                <div className="icon-success">
                    <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <p>Redirigiendo a página principal...</p>
            </div>
        </Rodal>
    )
}
