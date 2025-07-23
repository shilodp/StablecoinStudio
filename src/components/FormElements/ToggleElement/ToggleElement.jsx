import "./ToggleElement.css";

function ToggleElement({
    title = "",
    label = "",
    type = "checkbox",
    checked = false,
    onChange,
    name = "",
    value = "",
    isRequired = false,
    tooltip,
    isDisabled = false,
}) {
    return (
        <>
            {title && (
                <label
                    className={`toggle-field-title ${isDisabled && "disabled"}`}
                >
                    {title}
                </label>
            )}
            <div className={`toggle-field ${isDisabled && "disabled"}`}>
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
                        disabled={isDisabled}
                    />
                    <div className={`toggle-ui ${checked ? "on" : "off"}`}>
                        <div className="toggle-circle" />
                    </div>
                    <span className="toggle-label">{label}</span>
                </label>
                {tooltip}
            </div>
        </>
    );
}

export default ToggleElement;
