import { useState } from "react";
import "./Step3.css";

function Step3({ data, updateField }) {
    const [toggleValue, setToggleValue] = useState(false);
    return (
        <div className="step3-container">
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

export default Step3;
