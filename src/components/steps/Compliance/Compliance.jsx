import RadioField from "@components/FormElements/RadioField/RadioField.jsx";
import BadgeInput from "@components/FormElements/BadgeInput/BadgeInput.jsx";
import DropDownField from "@components/FormElements/DropDownField/DropDownField.jsx";
import CheckboxField from "@components/FormElements/CheckboxField/CheckboxField.jsx";
import Tooltip from "@components/Tooltip/Tooltip.jsx";
import countries from "@assets/json/countries.json";
import "./Compliance.css";

function Compliance({ data, updateField }) {
    const lockedCountries = [
        "Cuba",
        "North Korea",
        "Iran",
        "Syria Arab Republic",
    ];
    const accessTypeOptions = [
        { value: "anyone", label: "Open to anyone" },
        { value: "restricted", label: "Gated / Restricted (KYC required)" },
    ];
    const KYCProviderOptions = [
        { value: "Shufti Pro", label: "Shufti Pro", disabled: false },
        { value: "Citizenship", label: "Citizenship", disabled: false },
        { value: "Accredited", label: "Accredited", disabled: false },
        { value: "custom", label: "Custom", disabled: true },
    ];
    const KYCFlagTypeOptions = [
        { value: "Onchain", label: "Onchain", disabled: false },
        { value: "Offchain", label: "Offchain", disabled: false },
    ];

    return (
        <div className="step-container step-compliance">
            <h3 className="step-title">KYC & Blocks</h3>
            <p className="step-subtitle">
                Define access policy, KYC provider and flag behavior.
            </p>

            <RadioField
                label="Access Type"
                name="accessType"
                currentValue={data.accessType}
                changeHandler={(value) => {
                    updateField("accessType", value);
                }}
                isRequired={true}
                optionsList={accessTypeOptions}
            />

            <BadgeInput
                value={data.restrictedCountries}
                locked={lockedCountries}
                onChange={(value) => {
                    updateField("restrictedCountries", value);
                }}
                placeholder="Add country..."
                label="Restricted Countries"
                tooltip={
                    <Tooltip text="Investors from only the countries specified below will not be allowed to invest" />
                }
                inputType="dropdownAutoComplete"
                autoCompleteOptions={countries}
            />

            {data.accessType === "restricted" && (
                <>
                    <DropDownField
                        label="KYC Provider"
                        value={data.KYCProvider}
                        options={KYCProviderOptions}
                        changeHandler={(value) => {
                            updateField("KYCProvider", value);
                        }}
                        isRequired={true}
                    />
                    <DropDownField
                        label="KYC Flag Type"
                        value={data.KYCFlagType}
                        options={KYCFlagTypeOptions}
                        changeHandler={(value) => {
                            updateField("KYCFlagType", value);
                        }}
                        isRequired={true}
                    />
                    <CheckboxField
                        label="Creator KYC Flag"
                        optionLabel="Grant flag to creator"
                        optionValue="true"
                        isChecked={data.grantFlagToCreator}
                        changeHandler={(value) => {
                            updateField("grantFlagToCreator", value);
                        }}
                        tooltip={
                            <Tooltip text="If enabled, the creator will automatically receive the required KYC flag for minting and managing the stablecoin, even if their address hasn’t passed standard verification" />
                        }
                    />
                </>
            )}

            <BadgeInput
                value={
                    data.accessTypeRadio === "block"
                        ? data.blockList
                        : data.whiteList
                }
                onChange={(value) => {
                    updateField(
                        data.accessTypeRadio === "block"
                            ? "blockList"
                            : "whiteList",
                        value
                    );
                    updateField(
                        data.accessTypeRadio === "block"
                            ? "whiteList"
                            : "blockList",
                        []
                    );
                }}
                placeholder="Add value"
                label={
                    data.accessTypeRadio === "block" ? "Blocklist" : "Whitelist"
                }
                inputType="text"
                usePasteButton={true}
            />
        </div>
    );
}

export default Compliance;
