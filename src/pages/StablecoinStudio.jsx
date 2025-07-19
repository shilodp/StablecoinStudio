import { useState } from "react";
import StepNavigation from "@components/StepNavigation/StepNavigation.jsx";
import StepControls from "@components/StepControls/StepControls.jsx";

import General from "@components/steps/General/General.jsx";
import Step2 from "@components/steps/Step2/Step2.jsx";
import Step3 from "@components/steps/Step3/Step3.jsx";
import Step4 from "@components/steps/Step4/Step4.jsx";
import Step5 from "@components/steps/Step5/Step5.jsx";
import Step6 from "@components/steps/Step6/Step6.jsx";
import Step7 from "@components/steps/Step7/Step7.jsx";
import StepFinal from "@components/steps/Step8/StepFinal.jsx";

import "./Stablecoin.css";

const STEPS = [
    { name: "General" },
    { name: "Pricing" },
    { name: "Compliance" },
    { name: "Permissions" },
    { name: "Liquidity Bootstrap" },
    { name: "Reserves + Yield" },
    { name: "Minting" },
    { name: "Summary" },
];

function StablecoinStudio() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        stablecoinName: "",
        stablecoinSymbol: "",
        initialSupply: "",
        decimals: "",
        decimalsRadio: "block",
        metadata: undefined,
    });
    const totalSteps = STEPS.length;

    const goToStep = (step) => {
        if (step < currentStep) setCurrentStep(step);
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
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
    const validateStep = () => {
        const result = {
            state: false,
            errorMessage: "",
        };

        switch (currentStep) {
            case 1:
                if (
                    formData.stablecoinName?.trim() &&
                    formData.stablecoinSymbol?.trim() &&
                    formData.initialSupply?.trim() &&
                    formData.decimals?.trim()
                ) {
                    result.state = true;
                } else {
                    result.errorMessage = "Please fill in all required fields";
                }
                break;
            default:
                result.state = true;
        }

        return result;
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <General data={formData} updateField={updateField} />;
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
                stepsList={STEPS}
                goToStep={goToStep}
            />

            <div className="step-content">{renderStep()}</div>

            <StepControls
                currentStep={currentStep}
                totalSteps={totalSteps}
                onNext={nextStep}
                onPrev={prevStep}
                formData={formData}
                validateStep={validateStep}
            />
        </div>
    );
}

export default StablecoinStudio;
