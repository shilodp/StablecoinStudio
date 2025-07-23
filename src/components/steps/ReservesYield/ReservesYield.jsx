import DropDownField from "@components/FormElements/DropDownField/DropDownField";
import WarningMessage from "@components/WarningMessage/WarningMessage";
import ToggleElement from "@components/FormElements/ToggleElement/ToggleElement";
import TextField from "@components/FormElements/TextField/TextField";
import UrlField from "@components/FormElements/UrlField/UrlField";
import RadioField from "@components/FormElements/RadioField/RadioField";
import Tooltip from "@components/Tooltip/Tooltip";

import "./ReservesYield.css";

function ReservesYield({ data, updateField }) {
    return (
        <div className="step-container reserves-yield-step">
            <h2 className="step-title">Backing & Distribution</h2>
            <p className="step-subtitle">
                Specify jurisdiction, show collateral proof, configure yield
                accrual/payout.
            </p>

            <DropDownField
                label="Regulation"
                value={data.regulation}
                options={[
                    {
                        label: "United States jurisdiction",
                        value: "United States jurisdiction",
                    },
                ]}
                changeHandler={(value) => {
                    updateField("USJurisdiction", value);
                }}
                isRequired={true}
                tooltip={
                    <Tooltip text="The jurisdiction of the digital security. New jurisdiction could be supported in the future."></Tooltip>
                }
            />

            <WarningMessage text="Important: Consult your legal and financial advisor to ensure the selected jurisdiction and rules are compliant. These details cannot be changed after launch" />

            <h3 className="step-title">
                Proof-of-Reserve
                <Tooltip text="Public, verifiable proof of the collateral backing your stablecoin. Enabling Transparency will require a link (on‑chain address, Merkle/MPT tree, auditor report, etc.)"></Tooltip>
            </h3>

            <ToggleElement
                title="Will your stablecoin be collateralised by another on-chain asset?"
                name="isCollateralised"
                checked={data.isCollateralised}
                onChange={(value) => {
                    updateField("isCollateralised", value);
                }}
                value="Yes"
                label="Yes"
            />

            {data.isCollateralised && (
                <UrlField
                    value={data.collateralisedLink}
                    changeHandler={(value) => {
                        updateField("collateralisedLink", value);
                    }}
                    placeholder="Paste Link"
                    usePasteButton={true}
                />
            )}

            <ToggleElement
                title="Proof-of-Reserve supply transparency:"
                name="PoRSupplyTransparency"
                checked={data.PoRSupplyTransparency}
                onChange={(value) => {
                    updateField("PoRSupplyTransparency", value);
                }}
                value="Yes"
                label="Yes"
            />

            {data.PoRSupplyTransparency && (
                <UrlField
                    value={data.PoRSupplyTransparencyLink}
                    changeHandler={(value) => {
                        updateField("PoRSupplyTransparencyLink", value);
                    }}
                    placeholder="Paste Link"
                    usePasteButton={true}
                />
            )}

            <h2 className="step-title">
                Yield / Yield distribution
                <Tooltip text="Configure whether the token accrues yield and how payouts are delivered to holders"></Tooltip>
            </h2>

            <ToggleElement
                title="Yield available"
                name="isYieldAvailable"
                checked={data.isYieldAvailable}
                onChange={(value) => {
                    updateField("isYieldAvailable", value);
                }}
                value="Yes"
                label="Yes"
            />

            {data.isYieldAvailable && (
                <>
                    <RadioField
                        label="Yield distribution method"
                        name="YieldDistributionMethod"
                        currentValue={data.YieldDistributionMethod}
                        optionsList={[
                            {
                                label: "Automated distribution",
                                value: "Automated distribution",
                            },
                            {
                                label: "Chunks",
                                value: "Chunks",
                            },
                            {
                                label: "Claims",
                                value: "Claims",
                            },
                        ]}
                        changeHandler={(value) => {
                            updateField("YieldDistributionMethod", value);
                        }}
                    />

                    <ToggleElement
                        title="Yield transparency"
                        name="YieldTransparency"
                        checked={data.YieldTransparency}
                        onChange={(value) => {
                            updateField("YieldTransparency", value);
                        }}
                        value="Yes"
                        label="Yes"
                    />
                </>
            )}
        </div>
    );
}

export default ReservesYield;
