import "./TextField.css";

function TextField({ label, value, changeHandler, isRequired }) {
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
            </label>
        </div>
    );
}

export default TextField;
