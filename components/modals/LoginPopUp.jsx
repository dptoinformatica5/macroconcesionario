import { useState, useEffect } from "react";
import { login } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faTimesCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from '../../utils/axiosInstance';
import GoogleAndFacebookLogin from "../GoogleAndFacebookLogin";
import AccountBlocked from "./AccountBlocked";

export default function LoginPopUp({ isActive, setShowPopUp, setSend, message }) {
    const [loginForm, setLoginForm] = useState(true);
    const [state, setState] = useState({name: '', email: '', password: '', confirm_password: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [isResendLoading, setIsResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const navbar = document.querySelector('#navbar');

    useEffect(() => {
        if(isActive) navbar.style.zIndex = '5';

        if(error) {
            if(!error.includes('Su cuenta no está activada') || resendSuccess) {
                setTimeout(() => {
                    setError(false);
                    setResendSuccess(false);
                }, 7000);
            }
        }

        return () => {
            navbar.style.zIndex = '200';
        }
    }, [isActive, error, resendSuccess]);

    const handleChange = e => {
        setState(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if(!loginForm && state.password !== state.confirm_password) return setError('Las contraseñas no coinciden');

        setError(false);
        setResendSuccess(false);
        setIsLoading(true);
        setDisabled(true);
        try {
            let {data} = await axios.post(`${loginForm ? 'login' : 'register'}`, state);
            if(!loginForm) {
                const res = await axios.post('login', state);
                data = res.data;
                setIsLoading(false);
                setDisabled(false);
                setShowPopUp(false);
                dispatch(login(data));
                setSend(true);
            } else {
                setIsLoading(false);
                setDisabled(false);
                if(data.status === 'active') {
                    dispatch(login(data));
                    setShowPopUp(false);
                    setSend(true);
                } 
                if(data.status === 'blocked') {
                    setShowModal(true);
                }
                if(data.status === 'pending') {                          
                    setError('Su cuenta no está activada. Si no le ha llegado el correo para activarla o no lo encuentra, puede volver a solicitarlo en el siguiente enlace.');
                }
            }            
        } catch(error) { 
            setIsLoading(false);
            setDisabled(false);
            if(loginForm) {
                setError(error.response.data.error);
            } else {
                let errorName = error.response.data.name;
                if(errorName) errorName = 'El nombre de usuario ya existe, intente poner uno distinto.';
                setError(error.response.data.password || error.response.data.email || errorName);
            }
        }
    }

    const resend = async () => {
        setResendSuccess(null);
        setIsResendLoading(true);
        const {email} = state;
        if(email) {
            try {
                await axios.post('resend-activate', { email });
                setIsResendLoading(false);
                setResendSuccess(true);
                setError(false);
            } catch (error) { 
                setIsResendLoading(false);
                console.log(error.response.data);
                //setResendSuccess(false);
            }
        }
    }

    const renderError = () => {
        if(error) {
            let res = [<p key={1} className="error mt-3">{`Error: ${error}`}</p>];
            if(error.includes('Su cuenta no está activada')) {
                res.push(
                    <p key={2} className="text-center">                        
                        <span style={{color: 'black', textDecoration: 'underline', cursor: 'pointer'}} onClick={resend}>Activar cuenta</span>&nbsp;
                        {isResendLoading && (
                            <div className="spinner-border spinner-border-sm text-dark" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>  
                        )}
                    </p>
                );
            }
            return <div>{res}</div>;
        }
    }

    const renderForm = () => {
        if(loginForm) {
            return (
                <>
                    <div className="pop-up-header d-flex justify-content-between align-items-center">
                        <h2 className="m-0">Iniciar sesión</h2>
                        <div className="m-0" style={{cursor: 'pointer'}} onClick={() => setShowPopUp(false)}>
                            <FontAwesomeIcon icon={faTimesCircle} size="2x" />
                        </div>
                    </div>
                    <hr />
                    <p>Debes iniciar sesión para poder dejar tu comentario.</p>
                
                    <GoogleAndFacebookLogin isModal={true} setSend={setSend} setShowPopUp={setShowPopUp} message={message} />

                    <form onSubmit={handleSubmit} method="POST" className="mt-4">
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={state.email}
                                onChange={e => handleChange(e)}
                                placeholder="Email"
                                required
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={state.password}
                                onChange={e => handleChange(e)}
                                placeholder="Contraseña"
                                required
                            />
                            <label htmlFor="password">Contraseña</label>
                        </div>

                        <button type="submit" className="g-recaptcha" disabled={disabled}>
                            {!isLoading ? (
                                <>
                                    <span>Iniciar sesión</span>
                                    <FontAwesomeIcon icon={faSignInAlt} style={{ marginLeft: "10px" }} />
                                </>
                            ) : (
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )}
                        </button>
                        <div className="clearfix"></div>

                        {renderError()}
                        { resendSuccess && <p className="text-success mt-4">Hemos vuelto a enviar un correo de activación de cuenta al email indicado anteriormente.</p> }

                        <hr className="my-4" />
                        <p className="text-center">
                            ¿No tienes cuenta?<br/>
                            <button type="button" className="btn-contact mt-3" onClick={() => setLoginForm(false)}>Crear cuenta</button>
                        </p>                        
                    </form>

                    <AccountBlocked showModal={showModal} setShowModal={setShowModal} />
                </>
            )
        } else {
            return (
                <>
                    <div className="pop-up-header d-flex justify-content-between align-items-center">
                        <h2 className="m-0">Crear cuenta</h2>
                        <div className="m-0" style={{cursor: 'pointer'}} onClick={() => setShowPopUp(false)}>
                            <FontAwesomeIcon icon={faTimesCircle} size="2x" />
                        </div>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={state.name}
                                onChange={(e) => handleChange(e)}
                                name="name"
                                placeholder="Usuario"
                                required
                            />
                            <label htmlFor="name">Usuario</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={state.email}
                                onChange={e => handleChange(e)}
                                placeholder="Email"
                                required
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={state.password}
                                onChange={e => handleChange(e)}
                                placeholder="Contraseña"
                                required
                            />
                            <label htmlFor="password">Contraseña</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input
                                type="password"
                                className="form-control"
                                name="confirm_password"
                                value={state.confirm_password}
                                onChange={(e) => handleChange(e)}
                                placeholder="Repetir contraseña"
                                required
                            />
                            <label htmlFor="confirm_password">Repetir contraseña</label>
                        </div>
                        
                        <button type="submit" className="g-recaptcha" disabled={disabled}>
                            {!isLoading ? (
                                <>
                                    <span>Crear cuenta</span>
                                    <FontAwesomeIcon icon={faUserPlus} style={{ marginLeft: "10px" }} />
                                </>
                            ) : (
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )}
                        </button>

                        <div className="clearfix"></div>
                        {error && <p className="error mt-3">{`Error: ${error}`}</p>}

                        <hr className="my-4" />
                        <p className="text-center">
                            ¿ya tienes una cuenta?<br/>
                            <button type="button" className="btn-contact mt-3" onClick={() => setLoginForm(true)}>Iniciar sesión</button>
                        </p>
                    </form>
                </>
            )
        }
    }

    return (
        <>
            <div className="overlay"></div>    
            <div className="login-pop-up-wrapper">
                <div className="login-pop-up">
                    {renderForm()}
                </div>
            </div>
        </>
    );
}
