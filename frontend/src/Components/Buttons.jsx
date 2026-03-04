function Buttons({
                     text,
                     onClick,
                     disabled = false,
                     loading = false,
                     type = "button",
                     variant = "primary",
                     size = "md"
                 }) {
    const className =
        `btn btn-${variant} btn-${size}` + (loading ? " btn-loading" : "");

    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? "Loading..." : text}
        </button>
    );
}

export default Buttons;
