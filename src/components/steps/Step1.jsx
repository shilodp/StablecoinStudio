import "./Step1.css";

function Step1({ data, updateField }) {
    return (
        <div className="step1-container">
            <h2>Basic Information</h2>
            <form>
                <label>
                    Name<span>*</span>
                    <input
                        type="text"
                        value={data.name || ""}
                        onChange={(e) => updateField("name", e.target.value)}
                        required
                    />
                </label>

                <label>
                    Symbol<span>*</span>
                    <input
                        type="text"
                        value={data.symbol || ""}
                        onChange={(e) => updateField("symbol", e.target.value)}
                        required
                    />
                </label>
            </form>
        </div>
    );
}

export default Step1;
