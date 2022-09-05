import { useState, useEffect } from 'react';
import Icon from './Icon';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
//import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Draft({ save, noticia = null }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        if(noticia) {
            const parsed = convertFromRaw(JSON.parse(noticia.editorState));
            setEditorState(EditorState.createWithContent(parsed));
        }
    }, [noticia]);

    const getFileBase64 = (file, callback) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = error => console.log(error);
    };

    const uploadImageCallBack = file => new Promise (
        (resolve, reject) => getFileBase64(
            file,
            data => resolve({ data: { link: data } })
        )
    );

    return (
        <>
            {/* <textarea disabled rows="10" className="w-100" value={JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 4)} /> */}

            <Editor
                editorState={editorState}
                toolbarClassName="toolbar-class"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                onEditorStateChange={setEditorState}                
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { 
                        urlEnabled: false,
                        uploadEnabled: true,
                        uploadCallback: uploadImageCallBack, 
                        previewImage: true,
                        alt: { present: false, mandatory: false },
                        popupClassName: 'noticia-upload-image-popup',
                    },
                }}
                toolbarCustomButtons={[<Save key={0} editorState={editorState} save={save} />]}
            />
        </>
    )
}

function Save({ editorState, save }) {
    return (
        <div onClick={() => save(editorState)} className="rdw-image-wrapper" style={{marginLeft: 'auto', cursor: 'pointer'}}>
            <Icon icon={'save'} size="lg" />
        </div>
    );
  }

