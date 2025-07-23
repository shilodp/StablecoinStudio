import { useState, useRef } from "react";
import ToggleElement from "@components/FormElements/ToggleElement/ToggleElement";
import CheckboxField from "@components/FormElements/CheckboxField/CheckboxField";
import "./Minting.css";

function Minting({ data, updateField }) {
    return (
        <div className="step-container minting-step">
            <h2 className="step-title">User Minting Rules</h2>
            <p className="step-subtitle">
                Allow/forbid user minting, set KYC requirement and accepted
                assets.
            </p>

            <div className="group">
                <ToggleElement
                    label="User-end minting available"
                    checked={data.UserendMinting}
                    onChange={(value) => {
                        updateField("UserendMinting", value);
                    }}
                    value="true"
                    isRequired={true}
                />
            </div>

            <div className="group">
                <ToggleElement
                    label="KYC flag required for mint"
                    checked={data.KYCFlagForMint}
                    onChange={(value) => {
                        updateField("KYCFlagForMint", value);
                    }}
                    value="true"
                    isRequired={true}
                    isDisabled={!data.UserendMinting}
                />
            </div>

            <div className="group">
                <CheckboxField
                    label="Assets eligible for mint*"
                    optionLabel="USDT"
                    optionValue="true"
                    isChecked={data.assetsForMint?.USDT}
                    changeHandler={(value) => {
                        updateField("assetsForMint", {
                            ...data.assetsForMint,
                            USDT: value,
                        });
                    }}
                    isDisabled={!data.UserendMinting}
                />
                <CheckboxField
                    optionLabel="USDC"
                    optionValue="true"
                    isChecked={data.assetsForMint?.USDC}
                    changeHandler={(value) => {
                        updateField("assetsForMint", {
                            ...data.assetsForMint,
                            USDC: value,
                        });
                    }}
                    isDisabled={!data.UserendMinting}
                />
                <CheckboxField
                    optionLabel="BTC"
                    optionValue="true"
                    isChecked={data.assetsForMint?.BTC}
                    changeHandler={(value) => {
                        updateField("assetsForMint", {
                            ...data.assetsForMint,
                            BTC: value,
                        });
                    }}
                    isDisabled={!data.UserendMinting}
                />
                <CheckboxField
                    optionLabel="Custom"
                    optionValue="true"
                    isDisabled={true}
                />
            </div>
            <div className="group">
                <ToggleElement
                    label="On-ramp eligible for mint"
                    checked={data.OnRampForMint}
                    onChange={(value) => {
                        updateField("OnRampForMint", value);
                    }}
                    value="true"
                    isRequired={true}
                    isDisabled={!data.UserendMinting}
                />
            </div>
        </div>
    );
}

export default Minting;
