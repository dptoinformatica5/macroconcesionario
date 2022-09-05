import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../../utils/axiosInstance';

export default function EditModal({ activeComment, setActiveComment }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onDelete = async () => {
        setError(null);
        setLoading(true);
        try {
            const {data} = await axios.delete(`comment/${router.query.pid}/${activeComment._id}`)
            if(data.ok) return router.reload();
        } catch (error) {
            setLoading(false);
            setError(error.response.data);
        }
    }

    const onClose = () => {
        setActiveComment(null);
        setError(null);
    }

    return (
        <Rodal visible={activeComment && true} onClose={onClose}>
            <div className="h-100 d-flex align-items-center justify-content-center py-2 px-4">
                <div className="text-center">
                    <h2>Editar comentario</h2>
                    {/* <div className="d-flex justify-content-center" style={{gap: '1rem'}}>
                        <button className="btn-eliminar" onClick={onDelete}>
                            {loading ?    
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div> 

                                : 'Eliminar'
                            }
                        </button>
                        <button className="btn-cancelar" onClick={onClose}>
                            Cancelar
                        </button>
                    </div> */}

                    {error && <p className="error m-0 mt-3">{error.message}</p>}
                </div>
            </div>
        </Rodal>
    )
}