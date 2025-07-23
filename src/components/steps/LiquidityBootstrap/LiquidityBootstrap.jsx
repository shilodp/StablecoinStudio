import TableField from "@components/FormElements/TableField/TableField";
import WarningMessage from "@components/WarningMessage/WarningMessage";
import CheckboxField from "@components/FormElements/CheckboxField/CheckboxField";
import Tooltip from "@components/Tooltip/Tooltip";
import "./LiquidityBootstrap.css";

function LiquidityBootstrap({ data, updateField }) {
    return (
        <div className="step-container liquidity-step">
            <h2 className="step-title">Initial Liquidity</h2>
            <p className="step-subtitle">
                Deposit starter liquidity and opt-in for listing.
            </p>

            <TableField
                label="Set exchange liquidity"
                columns={[]} // ToDO: add JSON values
                values={data.exchangeLiquidity}
                isRequired={true}
            />
            <p className="liquidity-label">Total bootstrap value: $ {data.totalLiquidity.toFixed(2)}</p>

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
