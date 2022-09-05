import { useState, useEffect, useCallback } from "react"
import axios from '../utils/axiosInstance';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const startFetch = async (url, body = null, method = 'get') => {
        setIsLoading(false);
        setError(null);
        setData(null);
        try {
            setIsLoading(true);            
            const {data} = await makeRequest(url, body, method);
            setData(data);
        } catch (err) {
            setError(err.response.data);
        }
        setIsLoading(false);
    }

    const makeRequest = async (url, body, method) => {
        const m = method.toLowerCase();
        if(m === 'post') return axios.post(url, body);
        return axios.get(url);
    }

    return [isLoading, startFetch, error, data]
}

export const useRecaptcha = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    //Google Recaptcha
    const handleReCaptchaVerify = useCallback(async () => {
        if (executeRecaptcha) {
            return await executeRecaptcha();
        } else {
            return;
        }
        }, [executeRecaptcha]);

    useEffect(() => handleReCaptchaVerify, [handleReCaptchaVerify]);

    const verifyRecaptcha = async () => {
        const token = await handleReCaptchaVerify();
        try {            
            const {data} = await axios.post('verifyReCaptcha', {token});
            return data;
        } catch(err) {
            console.log(err.response.data);
        }
    }

    return { verifyRecaptcha }
}