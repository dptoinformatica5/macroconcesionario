import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Icon from '../Icon';

export default function ErrorModal({ showModal, setShowModal, setError, title, description }) {
    const close = () => {
        setShowModal(false);
        setError(null);
    }

    return (
        <Rodal visible={showModal} onClose={close}>
            <div className="text-center">
                <h2>{title}</h2>
                <div className="icon-success m-0">
                    <Icon icon={'times'} color="darkred" />
                </div>
                <p>{description}</p>
            </div>
        </Rodal>
    )
}