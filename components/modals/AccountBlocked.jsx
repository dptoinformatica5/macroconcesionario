import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Icon from '../Icon';

export default function AccountBlocked({ showModal, setShowModal }) {
    return (
        <Rodal visible={showModal} onClose={() => setShowModal(false)}>
            <div className="text-center">
                <h2>Cuenta Bloqueada</h2>
                <div className="icon-success m-0">
                    <Icon icon={'ban'} color="darkred" />
                </div>
                <p>Esta cuenta ha sido bloqueada por el administrador.</p>
            </div>
        </Rodal>
    )
}
