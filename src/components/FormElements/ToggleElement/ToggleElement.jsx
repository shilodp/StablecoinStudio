import "./ToggleElement.css";

function ToggleElement({
    label,
    type = "checkbox",
    checked,
    onChange,
    name,
    value,
    isRequired,
    tooltip,
}) {
    return (
        <div className="toggle-field">
            <label className="toggle-label">
                <input
                    type={type}
                    checked={checked}
                    onChange={(e) => {
                        onChange(e.target.checked, e.target.value);
                    }}
                    name={name}
                    value={value}
                    className="toggle-input"
                    required={isRequired}
                />
                <div className={`toggle-ui ${checked ? "on" : "off"}`}>
                    <div className="toggle-circle" />
                </div>
                <span className="toggle-label">{label}</span>
            </label>
            {tooltip}
        </div>
    );
}

export default ToggleElement;
