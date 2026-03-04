function Inputs({
                    label,
                    value,
                    onChange,
                    type = "text",
                    placeholder = "",
                    disabled = false
                }) {
    return (
        <div className="field">
            {label && <div className="label">{label}</div>}
            <input
                className="input"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
}

export default Inputs;
