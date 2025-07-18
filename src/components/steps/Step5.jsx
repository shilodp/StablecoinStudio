
import "./Step5.css";

function Step5({ data, updateField }) {
    const options = ["Option A", "Option B", "Option C"];
    const selected = data.selectedOptions || [];

    const toggleOption = (option) => {
        if (selected.includes(option)) {
            updateField(
                "selectedOptions",
                selected.filter((o) => o !== option)
            );
        } else {
            updateField("selectedOptions", [...selected, option]);
        }
    };

    return (
        <div className="step5-container">
            <h2>Choose Options</h2>
            {options.map((option) => (
                <label key={option}>
                    <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={() => toggleOption(option)}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
}

export default Step5;
