import "./StepNavigation.css";

function StepNavigation({ currentStep, stepsList, goToStep }) {
    return (
        <div className="step-nav">
            {stepsList.map((step, index) => (
                <div
                    key={step.name}
                    className={
                        "step-nav-item" +
                        (index + 1 === currentStep ? " active" : "") +
                        (index + 1 < currentStep ? " clickable" : "") +
                        (index + 1 > currentStep ? " disabled" : "")
                    }
                    onClick={() => {
                        if (index + 1 < currentStep) {
                            goToStep(index + 1);
                        }
                    }}
                >
                    <div className="step-label">{step.name}</div>
                </div>
            ))}
        </div>
    );
}

export default StepNavigation;
