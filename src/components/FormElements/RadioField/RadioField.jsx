import "./RadioField.css";

function RadioField({
    label = "",
    name = "",
    currentValue = "",
    optionsList = [],
    changeHandler,
    isRequired = false,
}) {
    return (
        <fieldset className="radio-group">
            {label && (
                <legend className="radio-group-legend">
                    {label}
                    {isRequired && <span>*</span>}
                </legend>
            )}
            {optionsList.map((option) => (
                <div key={option.value} className="radio-input">
                    <label
                        className={`radio-option ${
                            option.disabled && "disabled"
                        }`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            onChange={(e) => {
                                changeHandler(e.target.value);
                            }}
                            checked={currentValue === option.value}
                            required={isRequired}
                            disabled={option.disabled}
                        />
                        <span>{option.label}</span>
                    </label>
                    {option.tooltip}
                </div>
            ))}
        </fieldset>
    );
}

export default RadioField;
