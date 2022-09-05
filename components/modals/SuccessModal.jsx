import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Icon from '../Icon';

export default function SuccessModal({ showModal, setShowModal, output }) {
    return (
        <Rodal visible={showModal} onClose={() => setShowModal(false)}>
            <div className="text-center">
                <h3>{output}</h3>
                <div className="icon-success m-0">
                    <Icon icon={'check-circle'} color="darkgreen" />
                </div>
            </div>
        </Rodal>
    )
}