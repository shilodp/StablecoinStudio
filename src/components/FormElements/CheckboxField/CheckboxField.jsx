import "./CheckboxField.css";

function CheckboxField({
    label,
    optionLabel,
    optionValue,
    isChecked,
    changeHandler,
    tooltip,
    isRequired,
}) {
    return (
        <>
            {label && (
                <label className="checkbox-label">
                    {label}
                    {isRequired && <span>*</span>}
                </label>
            )}
            <div key={optionValue} className="checkbox-input">
                <label>
                    <input
                        type="checkbox"
                        value={optionValue}
                        onChange={(e) => {
                            changeHandler(
                                e.target.checked ? e.target.value : false
                            );
                        }}
                        checked={isChecked}
                        required={isRequired}
                    />
                    <span>{optionLabel}</span>
                </label>
                {tooltip}
            </div>
        </>
    );
}

export default CheckboxField;
