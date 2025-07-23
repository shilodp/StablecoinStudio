import "./NumberField.css";

function NumberField({
    label = "",
    value = "",
    changeHandler,
    isRequired = false,
    min,
    max,
    step,
    placeholder = "Type here...",
}) {
    return (
        <div className="number-input">
            <label>
                {label}
                {label && isRequired && <span>*</span>}
                <input
                    type="number"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        changeHandler(e.target.value);
                    }}
                    required={isRequired}
                    min={min}
                    max={max}
                    step={step}
                />
            </label>
        </div>
    );
}

export default NumberField;
