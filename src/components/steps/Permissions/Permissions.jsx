import { useState } from "react";
import TextField from "@components/FormElements/TextField/TextField";
import RadioField from "@components/FormElements/RadioField/RadioField";
import CheckboxField from "@components/FormElements/CheckboxField/CheckboxField";
import TableField from "@components/FormElements/TableField/TableField";
import "./Permissions.css";

function Permissions({ data, updateField }) {
    const rolesTableColumns = [
        {
            name: "role",
            label: "Role",
            type: "select",
            options: [
                {
                    value: "Ban",
                    label: "Ban",
                    disabled: true,
                },
                {
                    value: "Freeze",
                    label: "Freeze",
                    disabled: true,
                },
                {
                    value: "Pause",
                    label: "Pause",
                    disabled: true,
                },
                {
                    value: "Burn",
                    label: "Burn",
                    disabled: true,
                },
                {
                    value: "Rescue",
                    label: "Rescue",
                    disabled: true,
                },
            ],
            unique: true,
        },
        {
            name: "address",
            label: "Address",
            type: "text",
            placeholder: "Type address(-es) separated by comma",
        },
    ];
    const rolesTableValues = [
        {
            role: "Ban",
        },
        {
            role: "Freeze",
        },
        {
            role: "Pause",
        },
        {
            role: "Burn",
        },
        {
            role: "Rescue",
        },
    ];

    return (
        <div className="step-container permissions-step">
            <h2 className="step-title">Admins & Roles</h2>
            <p className="step-subtitle">
                Set name, supply, decimals and address filters.
            </p>

            <RadioField
                label="Admin Access Control"
                name="adminAccessControl"
                currentValue={data.adminAccessControl}
                optionsList={[
                    { value: "single", label: "Single admin (creator)" },
                    {
                        value: "advanced",
                        label: "Advanced roles",
                        disabled: true,
                    },
                ]}
                changeHandler={(value) => {
                    updateField("adminAccessControl", value);
                }}
                isRequired={true}
            />

            <TextField
                label="Admin Address"
                value={data.adminAddress}
                changeHandler={(value) => {
                    updateField("adminAddress", value);
                }}
                isRequired={true}
                usePasteButton={true}
            />

            <CheckboxField
                optionLabel="Proxy Admin"
                isDisabled={true}
                checked={data.proxyAdmin}
                changeHandler={(value) => {
                    updateField("proxyAdmin", value);
                }}
            />

            <TableField
                label="Roles"
                isRequired={true}
                columns={rolesTableColumns}
                values={rolesTableValues}
            />
        </div>
    );
}

export default Permissions;
