import "./TextField.css";

function TextField({
    label,
    value,
    changeHandler,
    isRequired,
    usePasteButton,
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
        <div className="text-input">
            <label>
                {label}
                {isRequired && <span>*</span>}
                <input
                    type="text"
                    placeholder="Type here..."
                    value={value}
                    onChange={(e) => {
                        changeHandler(e.target.value);
                    }}
                    required={isRequired}
                />
                {usePasteButton && (
                    <button
                        type="button"
                        className="paste-button"
                        onClick={handlePasteClick}
                        title="Paste from clipboard"
                    ></button>
                )}
            </label>
        </div>
    );
}

export default TextField;
