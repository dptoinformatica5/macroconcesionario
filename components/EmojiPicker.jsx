import dynamic from 'next/dynamic';
const Picker = dynamic(
    () => import('emoji-picker-react'),
    { ssr: false }
);

import { useState } from 'react';
import Icon from './Icon'

export default function EmojiPicker({ setEmoji = null, customClass = null }) {
    const [show, setShow] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        if(setEmoji) setEmoji(emojiObject.emoji);
    };

    return (
        <div className={`${customClass ? customClass : ''}`}>
            <div className="emoji-picker position-relative">
                <Icon icon="laugh-beam" size={"lg"} color={"#444"} customClass="pointer" onClick={() => setShow(prev => !prev)} />
                {show && <Picker onEmojiClick={onEmojiClick} disableSearchBar/> }
            </div>
        </div>
    );
}