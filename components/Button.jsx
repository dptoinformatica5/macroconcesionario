import Icon from "./Icon";

export default function Button({ text, icon, iconColor, color, bg, customClass = "", wrapperClass = "", wrapperStyle = {}, onClick, type = "button" }) {
    const styles = customClass ? {} : {
        color, 
        backgroundColor: bg,
        padding: '.5rem .8rem',
        border: 'none',
        borderRadius: '5px',
        outline: 'none',
        fontWeight: '600'
    }

    return (
        <div className={wrapperClass} style={wrapperStyle}>
            <button type={type} className={customClass} style={styles} onClick={onClick}>
                { icon && <Icon icon={icon} color={iconColor} /> }
                <span style={icon && {marginLeft: '.4rem'}}>{text}</span>
            </button>
        </div>
    )
}
