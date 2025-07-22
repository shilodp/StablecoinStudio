import TableField from "@components/FormElements/TableField/TableField";
import Tooltip from "@components/Tooltip/Tooltip.jsx";
import TextField from "@components/FormElements/TextField/TextField.jsx";

import "./Pricing.css";

function Pricing({ data, updateField }) {
    const initialRow = [
        {
            name: "asset",
            label: "Asset",
            tooltip: (
                <Tooltip text="Select the currency or token you want to include in the basket. Each asset will contribute to the total value of your stablecoin" />
            ),
            type: "select",
            options: [
                {
                    value: "USD",
                    label: "USD",
                    disabled: false,
                },
                {
                    value: "KRW",
                    label: "KRW",
                    disabled: false,
                },
                {
                    value: "CAD",
                    label: "CAD",
                    disabled: false,
                },
                {
                    value: "RMB",
                    label: "RMB",
                    disabled: false,
                },
                {
                    value: "BTC",
                    label: "BTC",
                    disabled: false,
                },
                {
                    value: "ETH",
                    label: "ETH",
                    disabled: false,
                },
            ],
            unique: true,
        },
        {
            name: "weight",
            label: "Weight (%)",
            tooltip: (
                <Tooltip text="Specify the share of this asset in the basket as a percentage. All weights must add up to 100%" />
            ),
            type: "number",
            placeholder: "Enter value",
            min: 0,
            max: 100,
            step: 1,
        },
        {
            name: "source",
            label: "Oracle Source",
            tooltip: (
                <Tooltip text="Select the data provider for this asset’s price. “OpenStable” uses our default oracle. Choose “Custom” if you want to connect your own price feed. Reliable oracles are critical for stable and secure pricing" />
            ),
            type: "select",
            options: [
                {
                    value: "OpenStable",
                    label: "OpenStable",
                    disabled: false,
                },
                {
                    value: "Chainlink",
                    label: "Chainlink",
                    disabled: false,
                },
                {
                    value: "custom",
                    label: "Custom",
                    disabled: true,
                },
            ],
        },
    ];

    const addRow = () => {
        updateField("basketAssets", [
            ...data.basketAssets,
            { asset: "", weight: 0, source: "" },
        ]);
    };

    const removeRow = (index) => {
        const newRows = data.basketAssets.filter((_, i) => i !== index);
        updateField("basketAssets", newRows);
    };

    const updateCell = (index, key, value) => {
        const newRows = data.basketAssets.map((row, i) =>
            i === index ? { ...row, [key]: value } : row
        );
        updateField("basketAssets", newRows);
    };

    const customFields = data.basketAssets.filter(
        (row) => row.source === "custom"
    );

    return (
        <div className="step-container step-pricing">
            <TableField
                label="Basket Assets"
                isRequired={true}
                addRow={addRow}
                removeRow={removeRow}
                updateCell={updateCell}
                columns={initialRow}
                values={data.basketAssets}
            />

            <p className="hint">Total weight must be exactly 100 %</p>
            {customFields.map((row) => (
                <TextField
                    label={row.asset + " Custom Formula (Optional)"}
                    value={row.customValue}
                    changeHandler={(value) => {
                        const index = data.basketAssets.findIndex(
                            (item) => (item.asset = row.asset)
                        );
                        updateCell(index, "customFormula", value);
                    }}
                    isRequired={false}
                />
            ))}
        </div>
    );
}

export default Pricing;
