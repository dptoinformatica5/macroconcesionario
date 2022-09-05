import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useState, useEffect, useRef } from 'react'
import Icon from './Icon';
import EmojiPicker from './EmojiPicker';
import { useRouter } from 'next/router';
import ErrorModal from './modals/ErrorModal';
import Iframe from './tiptap/Iframe';
import AddVideoModal from './modals/AddVideoModal';

export default function Draft({ message = null, setMessage, setFiles, isCreateNoticias = false }) {
    const router = useRouter();
    const inputFile = useRef(null);
    const [emoji, setEmoji] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [showModalAddVideo, setShowModalAddVideo] = useState(false);

    const editor = useEditor({
        extensions: [ StarterKit, Image, Iframe],
        content: '',
        onUpdate({ editor }) {
            setMessage(editor.getJSON());
        }        
    });

    useEffect(() => {
        if(editor?.commands && editor?.content !== '') {
            !editor.isDestroyed && editor.commands.setContent({type: 'doc', content: []});
        }
        if(isCreateNoticias && editor && editor?.commands && !editor?.content && !editor?.isDestroyed && message) {
            editor?.commands.setContent(message)
        }
    }, [router, editor]);

    useEffect(() => {
        if(emoji) {
            const transaction = editor.state.tr.insertText(emoji)
            editor.view.dispatch(transaction)
            setEmoji('');
        }
    }, [emoji])

    const isValid = type => {
        if(type === "image/gif" || type === "image/jpeg" || type === "image/png" || type === "image/webp") {
            return true;
        }
        return false;
    }

    const addImage = () => {
        const file = inputFile.current.files[0];
        if(!file) return;

        if(file.size > 500000) {
            setError({ title: 'Archivo inválido', description: 'El tamaño del archivo tiene que ser inferior a 500kb.' });
            setShowModal(true);
            return;
        }

        if(isValid(file.type)) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {    
                if(reader.result) {                    
                    editor.chain().focus().setImage({ src: reader.result, alt: file.name, title: file.name }).run();
                    setFiles(prev => [...prev, file]);
                }
            }
        } else {
            setError({ 
                title: 'Formato del archivo inválido', 
                description: 'Solo se admiten los formatos gif, jpeg, jpg, png y webp.' 
            });
            setShowModal(true);
        }
    }

    const addIframe = src => editor.chain().focus().setIframe({ src }).run();

    return (
        <>     
            <EditorContent editor={editor} />
            <div className="d-flex justify-content-end align-items-center mt-2">
                <EmojiPicker customClass="d-none d-lg-block" setEmoji={setEmoji} />

                <div className="upload-image-icon" onClick={() => inputFile.current.click()}>
                    <input type="file" ref={inputFile} onChange={addImage} hidden />
                    <Icon icon="image" size={"lg"} color={"#444"} customClass="pointer" />
                </div>

                <Icon icon="video" size={"lg"} color={"#444"} customClass="pointer" onClick={() => setShowModalAddVideo(true)} />
            </div>

            {showModal && 
                <ErrorModal showModal={showModal} setShowModal={setShowModal} 
                    setError={setError} title={error.title} description={error.description} 
                />
            }

            {showModalAddVideo && 
                <AddVideoModal showModal={showModalAddVideo} setShowModal={setShowModalAddVideo} addIframe={addIframe} />
            }
        </>
    )
}

