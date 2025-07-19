import "./StepFinal.css";

function StepFinal({ data }) {
    return (
        <div className="step-final">
            <h2>Review Your Stablecoin Setup</h2>
            <div className="summary-grid">
                {Object.entries(data).map(([key, value]) => (
                    <div className="summary-item" key={key}>
                        <div className="label">{formatKey(key)}</div>
                        <div className="value">{renderValue(value)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function formatKey(key) {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
}

function renderValue(value) {
    if (Array.isArray(value)) {
        return value.length ? value.join(", ") : "—";
    }

    if (typeof value === "boolean") {
        return value ? "Yes" : "No";
    }

    return value?.toString() || "—";
}

export default StepFinal;
