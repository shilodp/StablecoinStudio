import DropDownField from "@components/FormElements/DropDownField/DropDownField";
import WarningMessage from "@components/WarningMessage/WarningMessage";
import ToggleElement from "@components/FormElements/ToggleElement/ToggleElement";
import TextField from "@components/FormElements/TextField/TextField";
import RadioField from "@components/FormElements/RadioField/RadioField";

import "./ReservesYield.css";

function ReservesYield({ data, updateField }) {
    return (
        <div className="step-container">
            <h2>Reserves</h2>

            <DropDownField
                label="Regulation"
                value={data.regulation}
                options={[
                    {
                        label: "United States jurisdiction",
                        value: "USJurisdiction",
                    },
                ]}
                changeHandler={(value) => {
                    updateField("USJurisdiction", value);
                }}
                isRequired={true}
            />

            <WarningMessage text="Important: Consult your legal and financial advisor to ensure the selected jurisdiction and rules are compliant. These details cannot be changed after launch" />

            <h3>Proof-of-Reserve</h3>

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
                <TextField
                    value={data.collateralisedLink}
                    changeHandler={(value) => {
                        updateField("collateralisedLink", value);
                    }}
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
                <TextField
                    value={data.PoRSupplyTransparencyLink}
                    changeHandler={(value) => {
                        updateField("PoRSupplyTransparencyLink", value);
                    }}
                    usePasteButton={true}
                />
            )}

            <h2>Yield / Yield distribution</h2>

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
                                value: "automated",
                            },
                            {
                                label: "Chunks",
                                value: "сhunks",
                            },
                            {
                                label: "Claims",
                                value: "сlaims",
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

                    {data.YieldTransparency && (
                        <TextField
                            value={data.YieldTransparencyLink}
                            changeHandler={(value) => {
                                updateField("YieldTransparencyLink", value);
                            }}
                            usePasteButton={true}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default ReservesYield;
