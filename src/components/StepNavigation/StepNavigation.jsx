import "./StepNavigation.css";

function StepNavigation({ currentStep, totalSteps, goToStep }) {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div className="step-nav">
            {steps.map((step) => (
                <div
                    key={step}
                    className={
                        "step-nav-item" +
                        (step === currentStep ? " active" : "") +
                        (step < currentStep ? " clickable" : "") +
                        (step > currentStep ? " disabled" : "")
                    }
                    onClick={() => {
                        if (step < currentStep) {
                            goToStep(step);
                        }
                    }}
                >
                    <div className="step-circle">{step}</div>
                    <div className="step-label">Step {step}</div>
                </div>
            ))}
        </div>
    );
}

export default StepNavigation;
