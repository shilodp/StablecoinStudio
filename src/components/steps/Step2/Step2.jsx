import "./Step2.css";

function Step2({ data, updateField }) {
    const toggleValue = data.toggleFeature || false;

    return (
        <div className="step2-container">
            <h2>Feature Settings</h2>

            <label>
                Enable Feature <span>*</span>
                <input
                    type="checkbox"
                    checked={toggleValue}
                    onChange={(e) =>
                        updateField("toggleFeature", e.target.checked)
                    }
                />
            </label>

            {toggleValue && (
                <label>
                    Feature Description
                    <input
                        type="text"
                        value={data.featureDescription || ""}
                        onChange={(e) =>
                            updateField("featureDescription", e.target.value)
                        }
                    />
                </label>
            )}
        </div>
    );
}

export default Step2;
