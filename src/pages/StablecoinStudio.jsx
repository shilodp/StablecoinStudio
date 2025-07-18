import { useState } from "react";
import StepNavigation from "@components/StepNavigation/StepNavigation.jsx";
import StepControls from "@components/StepControls/StepControls.jsx";

import Step1 from "@components/steps/Step1";
import Step2 from "@components/steps/Step2";
import Step3 from "@components/steps/Step3";
import Step4 from "@components/steps/Step4";
import Step5 from "@components/steps/Step5";
import Step6 from "@components/steps/Step6";
import Step7 from "@components/steps/Step7";
import StepFinal from "@components/steps/StepFinal";

import "./Stablecoin.css";

const TOTAL_STEPS = 8;

function StablecoinStudio() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // здесь все поля всех шагов
        name: "",
        symbol: "",
        // и т.д.
    });

    const goToStep = (step) => {
        if (step < currentStep) setCurrentStep(step);
    };

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 data={formData} updateField={updateField} />;
            case 2:
                return <Step2 data={formData} updateField={updateField} />;
            case 3:
                return <Step3 data={formData} updateField={updateField} />;
            case 4:
                return <Step4 data={formData} updateField={updateField} />;
            case 5:
                return <Step5 data={formData} updateField={updateField} />;
            case 6:
                return <Step6 data={formData} updateField={updateField} />;
            case 7:
                return <Step7 data={formData} updateField={updateField} />;
            case 8:
                return <StepFinal data={formData} />;
            default:
                return null;
        }
    };

    return (
        <div className="stablecoin-container">
            <StepNavigation
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                goToStep={goToStep}
            />

            <div className="step-content">{renderStep()}</div>

            <StepControls
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                onNext={nextStep}
                onPrev={prevStep}
                formData={formData}
            />
        </div>
    );
}

export default StablecoinStudio;
