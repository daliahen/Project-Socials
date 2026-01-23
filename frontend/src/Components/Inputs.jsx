function Inputs({label, value , onChange , type = "text"
                    ,placeholder = "" , disabled = false }){
    return(
        <div>
            {label && <div>{label}</div>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    )
}export default Inputs;