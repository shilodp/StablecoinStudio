import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../store/formSlice";
import { useNavigate } from "react-router-dom";
import jsyaml from "js-yaml";
import api from "@assets/json/api.json";
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
    const userData = useSelector((state) => state.auth.user);
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
            sendDataToServer(false, currentStep);
        } else {
            setShowFirstDisclamer(true);
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    }

    async function handleFieldChange(key, value) {
        if (key === "metadata") {
            value = await parseFile(value[0]);
        }
        dispatch(updateField({ key, value }));
    }

    async function parseFile(file) {
        const text = await file.text();
        return file.type === "application/json"
            ? JSON.parse(text)
            : jsyaml.load(text);
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

    async function sendDataToServer(finished = false, step) {
        const data = {};
        if (!finished) {
            data["Current Step"] = STEPS[step - 1].name;
        }
        switch (step) {
            case 8:
            case 7:
                data["User-end minting"] = !formData.UserendMinting
                    ? "Disabled"
                    : formData.KYCFlagForMint
                    ? "KYC Flag Required"
                    : "KYC Flag NOT Required";
                data["Assets eligible for Mint"] = formData.assetsForMint;
                data["On-ramp eligible for Mint"] = formData.OnRampForMint
                    ? "Yes"
                    : "No";
            case 6:
                data["Regulation"] = formData.regulation;
                data["Collateralised by another on-chain asset"] =
                    formData.isCollateralised ? "Yes" : "No";
                data["Collateralised Link"] = formData.isCollateralised
                    ? formData.collateralisedLink
                    : "";
                data["Proof-of-Reserve supply transparency"] =
                    formData.PoRSupplyTransparency ? "Yes" : "No";
                data["Proof-of-Reserve supply transparency Link"] =
                    formData.PoRSupplyTransparency
                        ? formData.PoRSupplyTransparencyLink
                        : "";
                data["Yield"] = formData.isYieldAvailable
                    ? "Enabled"
                    : "Disabled";
                data["Yield Distribution Method"] = formData.isYieldAvailable
                    ? formData.YieldDistributionMethod
                    : "Disabled";
                data["Yield Transparency"] = !formData.isYieldAvailable
                    ? "Disabled"
                    : formData.YieldTransparency
                    ? "Yes"
                    : "No";
            case 5:
                data["Exchange Liquidity"] = formData.exchangeLiquidity;
                data["Total Liquidity"] = formData.totalLiquidity;
                data["List On Open Stable"] = formData.listOnOpenStable
                    ? "Yes"
                    : "No";
            case 4:
                data["Admin Access Control"] =
                    formData.adminAccessControl === "single"
                        ? "Single Admin"
                        : "Advanced Roles";
                data["Admin Address"] = formData.adminAddress;
                data["Proxy Admin"] = formData.proxyAdmin ? "Yes" : "No";
            case 3:
                data["Access type"] =
                    formData.accessType === "anyone"
                        ? "Open to anyone"
                        : "Gated / Restricted";
                data["Restricted Countries"] =
                    formData.restrictedCountries.join(", ");
                data["KYC Provider"] =
                    formData.accessType === "restricted"
                        ? formData.KYCProvider
                        : "";
                data["KYC Flag Type"] =
                    formData.accessType === "restricted"
                        ? formData.KYCFlagType
                        : "";
                data["Creator KYC Flag"] =
                    formData.accessType !== "restricted"
                        ? ""
                        : formData.grantFlagToCreator
                        ? "Yes"
                        : "No";
                data["Blocklist"] = formData.blockList.join(", ");
                data["Whitelist"] = formData.whiteList.join(", ");
            case 2:
                data["Basket Assets"] = formData.basketAssets.map((item) => {
                    if (item.source === "custom") {
                        return {
                            asset: item.asset,
                            weight: item.weight,
                            source: item.customFormula,
                        };
                    }
                    return item;
                });
            case 1:
                data["Name"] = formData.stablecoinName;
                data["Symbol"] = formData.stablecoinSymbol;
                data["Initial Supply"] = formData.initialSupply;
                data["Decimals"] = formData.decimals;
                data["General Access Type"] =
                    formData.accessTypeRadio === "block"
                        ? "Blacklist"
                        : "Whitelist";
                data["JSON file"] = formData.metadata;
            default:
                data["User Name"] = userData.name;
                data["User Email"] = userData.email;
        }

        let link = finished ? api.key.final : api.key.step;

        const response = await fetch(link, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
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
                            <div style={{ textAlign: "center" }}>
                                <p>
                                    Make sure that all the data is correct. You
                                    won't be able to edit it later.
                                </p>
                            </div>
                        }
                        footer={
                            <>
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
                                        sendDataToServer(true, currentStep);
                                        setShowDonePopup(true);
                                    }}
                                >
                                    Confirm
                                </button>
                            </>
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
