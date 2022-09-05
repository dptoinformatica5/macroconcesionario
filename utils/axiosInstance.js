import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { store } from '../redux/store';
import { tokenRefresh, logout } from '../redux/actions';
import router from 'next/router';

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_CEO_API_URI });
axiosInstance.interceptors.request.use(async config => {
    const { userReducer } = store.getState();
    if(userReducer.accessToken) {
        const { accessToken, refreshToken } = userReducer;
        let currentDate = new Date();
        const decoded = jwt_decode(accessToken);

        if(decoded.exp * 1000 < currentDate.getTime()) {
            try {
                const {data} = await axios.post(`${process.env.NEXT_PUBLIC_CEO_API_URI}token`, { user_id: userReducer._id, refreshToken });
                store.dispatch(tokenRefresh(data));
            } catch (error) {
                console.log(error)
                const {_id, refreshToken, googleUser} = userReducer;
                store.dispatch(logout());
                if(googleUser) {
                    const auth2 = gapi.auth2.getAuthInstance();
                    if (auth2 != null) auth2.signOut().then(auth2.disconnect()); 
                }
                
                await axios.post('logout', { user_id: _id, refreshToken });
                return router.push('/login');
            }            
        }
        config.headers['authorization'] = `Bearer ${store.getState().userReducer.accessToken}`;
    }
    
    return config;

}, error => Promise.reject(error));

export default axiosInstance;