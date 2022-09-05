import { GoogleLogin } from 'react-google-login';
import axios from '../utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { login, googleRegister } from '../redux/actions';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AccountBlocked from './modals/AccountBlocked';

export default function GoogleAndFacebookLogin({ isModal, setSend, setShowPopUp }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const onSuccess = async res => {
        try {
            refreshTokenSetup(res);
            const {data} = await axios.post('oauth', res);
            if(data.user && data.user.status === 'blocked') return setShowModal(true);

            const email = data.email || data.user.email;
            if(data.googleRegister || data.user.status === 'deleted') {
                dispatch(googleRegister({ email }));
                return router.push('/aceptar-condiciones');
            }

            const data_login = await axios.post('login', { email, googleUser: data.user });  
            dispatch(login(data_login.data));

            if(isModal) {
                setShowPopUp(false);
                setSend(true);
                return;
            }
            
            return router.push('/');
            
        } catch (error) {
            //console.log(error.response.data);
        }
    }

    const refreshTokenSetup = res => {
        let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
        const refreshToken = async () => {
            const newAuthRes = await res.reloadAuthResponse();
            refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
            setTimeout(refreshToken, refreshTiming);
        }
        setTimeout(refreshToken, refreshTiming);
    }

    return (
        <div className="mt-4 row justify-content-center align-items-center">
            <div className="col-12 col-lg-12 d-flex justify-content-center">
                <GoogleLogin 
                    clientId={process.env.NEXT_PUBLIC_OAUTH_PUBLIC}
                    buttonText="Entrar con Google" 
                    onSuccess={onSuccess}
                    onFailure={res => console.log(res)}
                    className="w-100 justify-content-center"              
                />
            </div>

            <AccountBlocked showModal={showModal} setShowModal={setShowModal} />
        </div>   
    )
}
