import "./UrlField.css";

function UrlField({
    label,
    value,
    changeHandler,
    isRequired,
    usePasteButton,
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
        <div className="url-input">
            <label>
                {label}
                {label && isRequired && <span>*</span>}
                <input
                    type="url"
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
                        className={`paste-button ${label ? "" : "no-label"}`}
                        onClick={handlePasteClick}
                        title="Paste from clipboard"
                    ></button>
                )}
            </label>
        </div>
    );
}

export default UrlField;
