import { useState, useRef } from "react";
import ToggleElement from "@components/FormElements/ToggleElement/ToggleElement";
import CheckboxField from "@components/FormElements/CheckboxField/CheckboxField";
import "./Minting.css";

function Minting({ data, updateField }) {
    return (
        <div className="step-container">
            <ToggleElement
                label="User-end minting available"
                checked={data.UserendMinting}
                onChange={(value) => {
                    updateField("UserendMinting", value);
                }}
                value="true"
                isRequired={true}
            />
            {data.UserendMinting && (
                <>
                    <ToggleElement
                        label="KYC flag required for mint"
                        checked={data.KYCFlagForMint}
                        onChange={(value) => {
                            updateField("KYCFlagForMint", value);
                        }}
                        value="true"
                        isRequired={true}
                    />
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
                    />
                    <CheckboxField
                        optionLabel="Custom"
                        optionValue="true"
                        isDisabled={true}
                    />
                    <ToggleElement
                        label="On-ramp eligible for mint"
                        checked={data.OnRampForMint}
                        onChange={(value) => {
                            updateField("OnRampForMint", value);
                        }}
                        value="true"
                        isRequired={true}
                    />
                </>
            )}
        </div>
    );
}

export default Minting;
