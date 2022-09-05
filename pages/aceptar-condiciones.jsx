import { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/actions';
import { useRouter } from 'next/router';
import axios from '../utils/axiosInstance';

export default function AceptarCondiciones() {
    const [checked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const { email } = useSelector(state => state.userReducer);
    const { rememberMessage } = useSelector(state => state.commentReducer);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const {data} = await axios.post('complete-oauth', { email, name });
            if(data?.status === 'success') {
                const data_login = await axios.post('login', { email: data.user.email, googleUser: data.user });
                dispatch(login(data_login.data));
                if(rememberMessage) return router.back();
                return router.push('/');
            }
        } catch (error) {
            setIsLoading(false);
            let errorName = error.response.data.name;
            if(errorName) {
                setError("El usuario ya existe, por favor, inténtelo con uno distinto.");
            }
        }
    }

    return (
        <div className="container">
            <section className="section_team" style={{maxWidth: '800px'}}>
                <h1 className="title-red">Acepta la Política de privacidad y los Términos de servicio</h1>
                <p className="text-center my-3">
                    Inserte un nombre para completar su usuario y acepte los siguientes términos y condiciones para terminar de crear su cuenta.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            name="name"
                            placeholder="Usuario"
                            required
                        />
                        <label htmlFor="name">Usuario</label>
                    </div>

                    <div className="form-floating mb-4">
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                name="checkBox" 
                                checked={checked} 
                                onChange={() => setChecked(prev => !prev)}
                            />
                            <label className="form-check-label" htmlFor="checkBox">
                                He leído y acepto la <Link href="/aviso-legal"><a target="blank">política de privacidad</a></Link>
                            </label>
                        </div>
                    </div>

                    {error && <p className="error">{`Error: ${error}`}</p>}

                    <button type="submit" className="g-recaptcha" disabled={!checked}>
                        {!isLoading ? (
                            <span>Enviar</span>
                        ) : (
                            <div className="spinner-border text-light" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                    </button>
                </form>
            </section>
        </div>
    )
}
