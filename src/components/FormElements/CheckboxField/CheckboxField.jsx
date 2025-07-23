import "./CheckboxField.css";

function CheckboxField({
    label = "",
    optionLabel = "",
    optionValue = false,
    isChecked = false,
    changeHandler,
    tooltip,
    isRequired = false,
    isDisabled = false,
}) {
    return (
        <>
            {label && (
                <label className="checkbox-label">
                    {label}
                    {isRequired && <span>*</span>}
                </label>
            )}
            <div
                key={optionValue}
                className={`checkbox-input ${isDisabled && "disabled"}`}
            >
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
                        disabled={isDisabled}
                    />
                    <span>{optionLabel}</span>
                </label>
                {tooltip}
            </div>
        </>
    );
}

export default CheckboxField;
