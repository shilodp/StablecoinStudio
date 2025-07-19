import { useState } from "react";
import "./StepControls.css";

function StepControls({
    currentStep,
    totalSteps,
    onNext,
    onPrev,
    validateStep,
}) {
    const [error, setError] = useState("");

    const handleNext = () => {
        const validation = validateStep();
        if (validation.state) {
            onNext();
            setError("");
        } else {
            setError(validation.errorMessage);
        }
    };

    return (
        <div className="step-controls">
            {error && <span className="step-error-message">{error}</span>}

            {currentStep > 1 && (
                <button onClick={onPrev} className="step-btn secondary">
                    Previous
                </button>
            )}

            {currentStep < totalSteps ? (
                <button onClick={handleNext} className="step-btn primary">
                    Continue
                </button>
            ) : null}
        </div>
    );
}

export default StepControls;
