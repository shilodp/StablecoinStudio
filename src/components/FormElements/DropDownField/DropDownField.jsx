import "./DropDownField.css";

function DropDownField({
    label = "",
    value = "",
    options = [],
    changeHandler,
    isRequired = false,
    tooltip,
}) {
    return (
        <div className="dropdown-field">
            <label>
                {label}
                {isRequired && <span>*</span>}
                {tooltip}
                <select
                    value={value}
                    onChange={(e) => changeHandler(e.target.value)}
                    required={isRequired}
                >
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default DropDownField;
