import Icon from './Icon'
import { useRef } from 'react'

export default function UploadImage({ setMessage }) {
    const inputFile = useRef(null);
    
    const isValid = type => {
        if(type === "image/gif" || type === "image/jpeg" || type === "image/png" || type === "image/webp") {
            return true;
        }
        return false;
    }

    const handleChange = () => {
        const file = inputFile.current.files[0];
        if(!file) return;

        if(isValid(file.type)) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {    
                if(reader.result) {
                    // setMessage(prev => ({...prev, content: [...prev.content, {
                    //     type: 'image',
                    //     attrs: {
                    //         src: reader.result,
                    //         alt: file.name,
                    //         title: file.name
                    //     }
                    // }]}));
                }
            }
        } else {
            alert('El formato del archivo ' + file.name + ' no es válido.');
        }
    }

    return (
        <div className="upload-image-icon" onClick={() => inputFile.current.click()}>
            <input type="file" ref={inputFile} onChange={handleChange} hidden />
            <Icon icon="paperclip" size={"lg"} color={"#444"} customClass="pointer" />
        </div>
    )
}
