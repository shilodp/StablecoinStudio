import RadioField from "@components/FormElements/RadioField/RadioField.jsx";
import BadgeInput from "@components/FormElements/BadgeInput/BadgeInput.jsx";
import DropDownField from "@components/FormElements/DropDownField/DropDownField.jsx";
import CheckboxField from "@components/FormElements/CheckboxField/CheckboxField.jsx";
import Tooltip from "@components/Tooltip/Tooltip.jsx";
import "./Compliance.css";

const countries = [
    "USA",
    "Canada",
    "UK",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "Cuba",
    "North Korea",
    "Iran",
    "Syria Arab Republic",
]; // ToDo: Replace with JSON

function Compliance({ data, updateField }) {
    const accessTypeOptions = [
        { value: "anyone", label: "Open to anyone" },
        { value: "restricted", label: "Gated / Restricted (KYC required)" },
    ];
    const KYCProviderOptions = [
        { value: "shuftiPro", label: "Shufti Pro", disabled: false },
        { value: "citizenship", label: "Citizenship", disabled: false },
        { value: "Accredited", label: "Accredited", disabled: false },
        { value: "custom", label: "Custom", disabled: true },
    ];
    const KYCFlagTypeOptions = [
        { value: "onchain", label: "Onchain", disabled: false },
        { value: "offchain", label: "Offchain", disabled: false },
    ];
    return (
        <div className="step-container">
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
                locked={["Cuba", "North Korea", "Iran", "Syria Arab Republic"]}
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
                        label="Access Type"
                        optionLabel="Grant flag to creator"
                        optionValue="grant"
                        isChecked={!!data.grantFlagToCreator}
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
                    data.decimalsRadio === "block"
                        ? data.blockList || []
                        : data.whiteList || []
                }
                onChange={(value) => {
                    updateField(
                        data.decimalsRadio === "block"
                            ? "blockList"
                            : "whiteList",
                        value
                    );
                    updateField(
                        data.decimalsRadio === "block"
                            ? "whiteList"
                            : "blockList",
                        undefined
                    );
                }}
                placeholder="Add value"
                label={
                    data.decimalsRadio === "block" ? "Blocklist" : "Whitelist"
                }
                inputType="text"
            />
        </div>
    );
}

export default Compliance;
