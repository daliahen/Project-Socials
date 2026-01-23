function Buttons({text , onClick, disabled = false
                     , loading = false , type = "button"}) {

    return (
        <button type={type}
                onClick={onClick}
                disabled={disabled || loading}>
            {loading ? " loading..." : text}
        </button>
    );
}export default Buttons;