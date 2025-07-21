import "./RadioField.css";

function RadioField({
    label,
    name,
    optionsList,
    currentValue,
    changeHandler,
    isRequired,
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
                    <label className="radio-option">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            onChange={(e) => {
                                changeHandler(e.target.value);
                            }}
                            checked={currentValue === option.value}
                            required={isRequired}
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
