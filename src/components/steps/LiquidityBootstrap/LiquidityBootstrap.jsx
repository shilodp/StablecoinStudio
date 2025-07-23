import TableField from "@components/FormElements/TableField/TableField";
import WarningMessage from "@components/WarningMessage/WarningMessage";
import CheckboxField from "@components/FormElements/CheckboxField/CheckboxField";
import Tooltip from "@components/Tooltip/Tooltip";
import "./LiquidityBootstrap.css";

function LiquidityBootstrap({ data, updateField, currenciesCources }) {
    const currenciesArr = Object.entries(currenciesCources).map(
        ([key, value]) => [key, value.USD]
    );
    const currenciesKeys = Object.keys(currenciesCources);

    const initialRow = [
        {
            name: "asset",
            label: "Asset",
            type: "select",
            unique: true,
            options: currenciesKeys.map((item) => {
                return {
                    value: item,
                    label: item,
                    disabled: false,
                };
            }),
        },
        {
            name: "amount",
            label: "Amount",
            type: "number",
            placeholder: "0.00",
            min: 0.0,
            step: 0.01,
        },
    ];

    const addRow = () => {
        updateField("exchangeLiquidity", [
            ...data.exchangeLiquidity,
            { asset: "", amount: Number(0).toFixed(2) },
        ]);
    };

    const removeRow = (index) => {
        const newRows = data.exchangeLiquidity.filter((_, i) => i !== index);
        updateField("exchangeLiquidity", newRows);
        countAmount();
    };

    const updateCell = (index, key, value) => {
        if (key === "amount") {
            value = Number(value).toFixed(2);
        }
        const newRows = data.exchangeLiquidity.map((row, i) =>
            i === index ? { ...row, [key]: value } : row
        );
        updateField("exchangeLiquidity", newRows);
        countAmount();
    };

    function countAmount() {
        const result = data.exchangeLiquidity.reduce((counter, item) => {
            return item.asset
                ? counter + currenciesCources[item.asset].USD * item.amount
                : counter;
        }, 0);

        updateField("totalLiquidity", result);
    }

    return (
        <div className="step-container liquidity-step">
            <h2 className="step-title">Initial Liquidity</h2>
            <p className="step-subtitle">
                Deposit starter liquidity and opt-in for listing.
            </p>

            <TableField
                label="Set exchange liquidity"
                isRequired={true}
                addRow={addRow}
                removeRow={removeRow}
                updateCell={updateCell}
                columns={initialRow}
                values={data.exchangeLiquidity}
            />
            <p className="liquidity-label">
                Total bootstrap value: $ {data.totalLiquidity.toFixed(2)}
            </p>

            <WarningMessage text="Liquidity added here is also counted as initial reserves" />

            <CheckboxField
                optionLabel="List on OpenStable Exchange"
                optionValue="true"
                changeHandler={(value) => {
                    updateField("listOnOpenStable", value);
                }}
                isChecked={data.listOnOpenStable === "true"}
                tooltip={
                    <Tooltip text="Your stablecoin will be published on OpenStable Exchange (Coming Soon)" />
                }
            />
        </div>
    );
}

export default LiquidityBootstrap;
