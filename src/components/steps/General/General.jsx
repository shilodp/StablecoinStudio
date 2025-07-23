import "./General.css";
import TextField from "@components/FormElements/TextField/TextField.jsx";
import NumberField from "@components/FormElements/NumberField/NumberField.jsx";
import DropDownField from "@components/FormElements/DropDownField/DropDownField";
import DragnDropField from "@components/FormElements/DragnDropField/DragnDropField.jsx";
import ToggleElement from "@components/FormElements/ToggleElement/ToggleElement";
import Tooltip from "@components/Tooltip/Tooltip";

function General({ data, updateField }) {
    const dropDownOptions = [
        { value: "", label: "Select option", disabled: true },
        { value: "18", label: "18", disabled: false },
        { value: "8", label: "8", disabled: false },
        { value: "6", label: "6", disabled: false },
        { value: "2", label: "2", disabled: false },
        { value: "custom", label: "Custom", disabled: false },
    ];

    return (
        <div className="step-container step-general">
            <h2 className="step-title">Set Up Your Stablecoin</h2>
            <p className="step-subtitle">
                Set the primary admin and granular operational roles.
            </p>

            <TextField
                label={"Stablecoin name"}
                value={data.stablecoinName}
                changeHandler={(value) => updateField("stablecoinName", value)}
                isRequired={true}
                key="stablecoinName"
            />
            <TextField
                label={"Stablecoin Symbol"}
                value={data.stablecoinSymbol}
                changeHandler={(value) =>
                    updateField("stablecoinSymbol", value)
                }
                isRequired={true}
                key="stablecoinSymbol"
            />
            <NumberField
                label={"Initial supply"}
                value={data.initialSupply}
                changeHandler={(value) => updateField("initialSupply", value)}
                isRequired={true}
                min={1000000}
                max={1000000000000}
                step={1}
            />
            <DropDownField
                label={"Decimals"}
                value={data.decimals}
                options={dropDownOptions}
                changeHandler={(value) => updateField("decimals", value)}
                isRequired={true}
                key="decimals"
            />
            {data.decimals === "custom" && (
                <NumberField
                    label="Decimals Custom Value"
                    value={data.decimalsCustomValue}
                    changeHandler={(value) => {
                        updateField("decimalsCustomValue", value);
                    }}
                    isRequired={true}
                />
            )}

            <label className="group-label">Access Type</label>
            <ToggleElement
                label="Blocklist"
                type="radio"
                isRequired={true}
                checked={data.accessTypeRadio === "block"}
                onChange={(checked, value) => {
                    checked && updateField("accessTypeRadio", value);
                }}
                name="accessTypeRadio"
                value="block"
                tooltip={<Tooltip text="Block access for specific accounts" />}
            />
            <ToggleElement
                label="Approval list"
                type="radio"
                isRequired={true}
                checked={data.accessTypeRadio === "approve"}
                onChange={(checked, value) => {
                    checked && updateField("accessTypeRadio", value);
                }}
                name="accessTypeRadio"
                value="approve"
                tooltip={
                    <Tooltip text="Allow access only for specific accounts" />
                }
            />

            <DragnDropField
                label="Metadata"
                text="Drop .json or .yaml to upload"
                accept=".json,.yaml"
                changeHandler={(value) => {
                    updateField("metadata", value);
                }}
                isMultiple={true}
                isRequired={false}
            />
        </div>
    );
}

export default General;
