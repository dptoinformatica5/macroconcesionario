import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export default function Icon({ icon, color, size, customClass = "", title , onClick }) {
    return (
        <FontAwesomeIcon 
            icon={['fas', icon]} 
            color={color || 'black'} size={size || '1x'} 
            className={customClass} 
            title={title || ''}
            onClick={onClick}
        />
    )
}
