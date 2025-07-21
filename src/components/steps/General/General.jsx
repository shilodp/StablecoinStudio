import "./General.css";
import TextField from "@components/FormElements/TextField/TextField.jsx";
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
            <form>
                <TextField
                    label={"Stablecoin name"}
                    value={data.stablecoinName}
                    changeHandler={(value) =>
                        updateField("stablecoinName", value)
                    }
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
                <TextField
                    label={"Initial supply"}
                    value={data.initialSupply}
                    changeHandler={(value) =>
                        updateField("initialSupply", value)
                    }
                    isRequired={true}
                    key="initialSupply"
                />
                <DropDownField
                    label={"Decimals"}
                    value={data.decimals}
                    options={dropDownOptions}
                    changeHandler={(value) => updateField("decimals", value)}
                    isRequired={true}
                    key="decimals"
                />

                <label className="group-label">
                    Decimals<span>*</span>
                </label>
                <ToggleElement
                    label="Blocklist"
                    type="radio"
                    isRequired={true}
                    checked={data.decimalsRadio === "block"}
                    onChange={(checked, value) => {
                        checked && updateField("decimalsRadio", value);
                    }}
                    name="decimalsRadio"
                    value="block"
                    tooltip={
                        <Tooltip text="Block access for specific accounts" />
                    }
                />
                <ToggleElement
                    label="Approval list"
                    type="radio"
                    isRequired={true}
                    checked={data.decimalsRadio === "approve"}
                    onChange={(checked, value) => {
                        checked && updateField("decimalsRadio", value);
                    }}
                    name="decimalsRadio"
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
            </form>
        </div>
    );
}

export default General;
