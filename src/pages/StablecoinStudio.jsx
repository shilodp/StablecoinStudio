import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../store/formSlice";
import StepNavigation from "@components/StepNavigation/StepNavigation.jsx";
import StepControls from "@components/StepControls/StepControls.jsx";

import General from "@components/steps/General/General.jsx";
import Pricing from "@components/steps/Pricing/Pricing.jsx";
import Compliance from "@components/steps/Compliance/Compliance.jsx";
import Permissions from "@components/steps/Permissions/Permissions.jsx";
import LiquidityBootstrap from "@components/steps/LiquidityBootstrap/LiquidityBootstrap.jsx";
import ReservesYield from "@components/steps/ReservesYield/ReservesYield.jsx";
import Minting from "@components/steps/Minting/Minting.jsx";
import Summary from "@components/steps/Summary/Summary.jsx";
import "./Stablecoin.css";

function StablecoinStudio() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.formData);
    const [currentStep, setCurrentStep] = useState(1);

    const STEPS = [
        {
            name: "General",
            component: (
                <General data={formData} updateField={handleFieldChange} />
            ),
        },
        {
            name: "Pricing",
            component: (
                <Pricing data={formData} updateField={handleFieldChange} />
            ),
        },
        {
            name: "Compliance",
            component: (
                <Compliance data={formData} updateField={handleFieldChange} />
            ),
        },
        {
            name: "Permissions",
            component: (
                <Permissions data={formData} updateField={handleFieldChange} />
            ),
        },
        {
            name: "Liquidity Bootstrap",
            component: (
                <LiquidityBootstrap
                    data={formData}
                    updateField={handleFieldChange}
                />
            ),
        },
        {
            name: "Reserves + Yield",
            component: (
                <ReservesYield data={formData} updateField={handleFieldChange} />
            ),
        },
        {
            name: "Minting",
            component: (
                <Minting data={formData} updateField={handleFieldChange} />
            ),
        },
        {
            name: "Summary",
            component: (
                <Summary data={formData} updateField={handleFieldChange} />
            ),
        },
    ];

    function goToStep(step) {
        if (step < currentStep) setCurrentStep(step);
    }

    function nextStep() {
        if (currentStep < STEPS.length) {
            setCurrentStep((prev) => prev + 1);
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    }

    function handleFieldChange(key, value) {
        dispatch(updateField({ key, value }));
    }

    function validateStep() {
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
                    formData.decimals
                ) {
                    result.state = true;
                } else {
                    result.errorMessage = "Please complete all required fields";
                }
                break;
            case 2:
                if (
                    formData.basketAssets.reduce(
                        (acc, item) => acc + +item.weight,
                        0
                    ) === 100
                ) {
                    result.state = true;
                } else {
                    result.errorMessage = "Total weight must be exactly 100 %";
                }
                break;
            default:
                result.state = true;
        }

        return result;
    }

    function renderStep() {
        return STEPS[currentStep - 1].component;
    }

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
                totalSteps={STEPS.length}
                onNext={nextStep}
                onPrev={prevStep}
                formData={formData}
                validateStep={validateStep}
            />
        </div>
    );
}

export default StablecoinStudio;
