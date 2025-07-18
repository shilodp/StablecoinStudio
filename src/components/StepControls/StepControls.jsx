import "./StepControls.css";

function StepControls({ currentStep, totalSteps, onNext, onPrev, formData }) {
    const validateStep = () => {
        // Простейшая валидация: проверка, что поля заполнены на 1 шаге
        if (currentStep === 1) {
            return formData.name?.trim() && formData.symbol?.trim();
        }

        // Другие шаги можно расширить по аналогии
        return true;
    };

    const handleNext = () => {
        if (validateStep()) {
            onNext();
        } else {
            alert("Please fill out required fields on this step.");
        }
    };

    return (
        <div className="step-controls">
            {currentStep > 1 && (
                <button
                    onClick={onPrev}
                    disabled={currentStep === 1}
                    className="step-btn secondary"
                >
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
