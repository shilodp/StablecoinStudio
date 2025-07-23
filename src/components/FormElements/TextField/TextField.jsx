import "./TextField.css";

function TextField({
    label = "",
    value = "",
    changeHandler,
    isRequired = false,
    usePasteButton = false,
    isDisabled = false,
    placeholder = "Type here...",
}) {
    const handlePasteClick = async () => {
        try {
            const text = await navigator.clipboard.readText();
            changeHandler(text);
        } catch (err) {
            console.error("Failed to read clipboard contents: ", err);
        }
    };
    return (
        <div className={`text-input ${isDisabled && "disabled"}`}>
            <label>
                {label}
                {label && isRequired && <span>*</span>}
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        changeHandler(e.target.value);
                    }}
                    required={isRequired}
                />
                {usePasteButton && (
                    <button
                        type="button"
                        className={`paste-button ${label ? '' : 'no-label'}`}
                        onClick={handlePasteClick}
                        title="Paste from clipboard"
                    ></button>
                )}
            </label>
        </div>
    );
}

export default TextField;
