import "./Step6.css";

function Step6({ data, updateField }) {
    const options = [
        { value: "opt1", label: "Option 1", disabled: false },
        { value: "opt2", label: "Option 2", disabled: true },
        { value: "opt3", label: "Option 3", disabled: false },
    ];

    const value = data.selectedOption || "";

    return (
        <div className="step6-container">
            <h2>Select an Option</h2>
            <select
                value={value}
                onChange={(e) => updateField("selectedOption", e.target.value)}
            >
                <option value="">-- Select --</option>
                {options.map((opt) => (
                    <option
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.disabled}
                    >
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Step6;
