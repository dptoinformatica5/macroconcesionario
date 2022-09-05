import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useState, useEffect } from 'react';
import { getVideoInfo } from 'youtube-video-exists';

export default function AddVideoModal({ showModal, setShowModal, addIframe }) {
    const [error, setError] = useState(null);
    const [urlVideo, setUrlVideo] = useState('');

    useEffect(() => {
        if(error) setTimeout(() => setError(null), 4000);
        return () => clearTimeout();
    }, [error])

    const onSubmit = async e => {
        e.preventDefault();
        setError(null);
        const isValid = await isCorrectYoutubeVideo(youtubeParser(urlVideo));
        if(!isValid) return setError('La url del vídeo no es válida.');

        addIframe(youtubeParser(urlVideo));
        setShowModal(false);
        setUrlVideo('');
    }

    const youtubeParser = url => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }
    
    const isCorrectYoutubeVideo = async id => {
        try {
            const {existing} = await getVideoInfo(id);
            return existing ? true : false;
        } catch(err) {}
    }

    return (
        <Rodal visible={showModal} onClose={() => setShowModal(false)}>
            <div className="text-center">
                <h2>Inserte la url del vídeo</h2>
                <small>* Recuerda que el vídeo tiene que estar disponible en YouTube.</small>
                <form onSubmit={onSubmit}>
                    <div className="input-group my-3">
                        <input type="text" className={`form-control ${error ? "is-invalid" : ""}`} onChange={e => setUrlVideo(e.target.value)}
                            value={urlVideo} placeholder='https://www.youtube.com/watch?v=XIMLoLxmTDw' required 
                        />
                    </div>

                    {error && <p className='error'>{error}</p>}

                    <button type="submit" className="enviar-respuesta">Insertar</button>
                </form>
            </div>
        </Rodal>
    )
}