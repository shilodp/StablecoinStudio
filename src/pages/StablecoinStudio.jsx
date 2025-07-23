import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../store/formSlice";
import { useNavigate } from "react-router-dom";
import StepNavigation from "@components/StepNavigation/StepNavigation.jsx";
import StepControls from "@components/StepControls/StepControls.jsx";
import Popup from "@components/Popup/Popup.jsx";

import General from "@components/steps/General/General.jsx";
import Pricing from "@components/steps/Pricing/Pricing.jsx";
import Compliance from "@components/steps/Compliance/Compliance.jsx";
import Permissions from "@components/steps/Permissions/Permissions.jsx";
import LiquidityBootstrap from "@components/steps/LiquidityBootstrap/LiquidityBootstrap.jsx";
import ReservesYield from "@components/steps/ReservesYield/ReservesYield.jsx";
import Minting from "@components/steps/Minting/Minting.jsx";
import Summary from "@components/steps/Summary/Summary.jsx";
import "./Stablecoin.css";

const modalsRoot = document.getElementById("modals-root");

function StablecoinStudio() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector((state) => state.form.formData);
    const [currentStep, setCurrentStep] = useState(1);
    const [currenciesCources, setCurrenciesCources] = useState({});

    const [showFirstDisclamer, setShowFirstDisclamer] = useState(false);
    const [showSecondDisclamer, setShowSecondDisclamer] = useState(false);
    const [showDonePopup, setShowDonePopup] = useState(false);
    const [confirmOne, setConfirmOne] = useState(false);
    const [confirmTwo, setConfirmTwo] = useState(false);
    const [confirmThree, setConfirmThree] = useState(false);
    const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);

    useEffect(() => {
        setConfirmButtonDisabled(!(confirmOne && confirmTwo && confirmThree));
    }, [confirmOne, confirmTwo, confirmThree]);

    useEffect(() => {
        fetch(
            "https://min-api.cryptocompare.com/data/pricemulti?fsyms=btc,eth,ltc,bch,bnb,eos,xrp,xlm,link,dot,yfi,sol,aed,ars,aud,bdt,bhd,bmd,brl,cad,chf,clp,cny,czk,dkk,eur,gbp,gel,hkd,huf,idr,ils,inr,jpy,krw,kwd,lkr,mmk,mxn,myr,ngn,nok,nzd,php,pkr,pln,rub,sar,sek,sgd,thb,try,twd,uah,vef,vnd,zar,xdr,xag,xau,bits,sats&tsyms=USD"
        )
            .then((res) => res.json())
            .then((res) => setCurrenciesCources(res))
            .catch((err) => console.error(err));
    }, []);

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
                    currenciesCources={currenciesCources}
                    updateField={handleFieldChange}
                />
            ),
        },
        {
            name: "Reserves + Yield",
            component: (
                <ReservesYield
                    data={formData}
                    updateField={handleFieldChange}
                />
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
        } else {
            setShowFirstDisclamer(true);
        }
        sendDataToServer();
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
            case 4:
                if (formData.adminAddress) {
                    result.state = true;
                } else {
                    result.errorMessage = "Please complete all required fields";
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

    function sendDataToServer(finished = false) {
        // ToDo: send data
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

            {showFirstDisclamer &&
                createPortal(
                    <Popup
                        header={<h2>Disclamer</h2>}
                        body={
                            <div>
                                <p>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={confirmOne}
                                            onChange={(e) => {
                                                setConfirmOne(e.target.checked);
                                            }}
                                        />
                                        <span>
                                            I hereby confirm that I have
                                            thoroughly read and reviewed the
                                            Rules and Restrictions, and that the
                                            details of the deal are in full
                                            compliance with the applicable
                                            Regulation.
                                        </span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={confirmTwo}
                                            onChange={(e) => {
                                                setConfirmTwo(e.target.checked);
                                            }}
                                        />
                                        <span>
                                            It is expressly acknowledged that
                                            the platform disclaims any
                                            responsibility associated with the
                                            content and enforcement of these
                                            rules.
                                        </span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={confirmThree}
                                            onChange={(e) => {
                                                setConfirmThree(
                                                    e.target.checked
                                                );
                                            }}
                                        />
                                        <span>
                                            The individual creating this digital
                                            security assumes full responsibility
                                            for enforcing the appropriate
                                            regulatory restrictions on the
                                            tokens.
                                        </span>
                                    </label>
                                </p>
                            </div>
                        }
                        footer={
                            <button
                                className="button"
                                disabled={confirmButtonDisabled}
                                onClick={() => {
                                    setShowFirstDisclamer(false);
                                    setShowSecondDisclamer(true);
                                }}
                            >
                                Agree and Continue
                            </button>
                        }
                        closeHandler={() => {
                            setShowFirstDisclamer(false);
                        }}
                    />,
                    modalsRoot,
                    "privacy-policy"
                )}

            {showSecondDisclamer &&
                createPortal(
                    <Popup
                        header={<h2>Disclamer</h2>}
                        body={
                            <p>
                                Make sure that all the data is correct. You
                                won't be able to edit it later.
                            </p>
                        }
                        footer={
                            <div style={{ textAlign: "center" }}>
                                <button
                                    className="button secondary"
                                    onClick={() => {
                                        setShowSecondDisclamer(false);
                                    }}
                                >
                                    Recheck
                                </button>
                                <button
                                    className="button"
                                    onClick={() => {
                                        setShowSecondDisclamer(false);
                                        sendDataToServer(true);
                                        setShowDonePopup(true);
                                    }}
                                >
                                    Confirm
                                </button>
                            </div>
                        }
                        closeHandler={() => {
                            setShowPrivacy(false);
                        }}
                    />,
                    modalsRoot,
                    "privacy-policy"
                )}

            {showDonePopup &&
                createPortal(
                    <Popup
                        header={<h2>Done!</h2>}
                        body={
                            <div style={{ textAlign: "center" }}>
                                <p>
                                    Your configuration has been saved and
                                    locked.
                                </p>
                                <p>
                                    You can now manage the token in the
                                    Dashboard.
                                </p>
                            </div>
                        }
                        footer={
                            <button
                                className="button"
                                onClick={() => {
                                    setShowDonePopup(false);
                                    navigate("/");
                                }}
                            >
                                Go to Dashboard
                            </button>
                        }
                        closeHandler={() => {
                            setShowDonePopup(false);
                        }}
                    />,
                    modalsRoot,
                    "privacy-policy"
                )}
        </div>
    );
}

export default StablecoinStudio;
