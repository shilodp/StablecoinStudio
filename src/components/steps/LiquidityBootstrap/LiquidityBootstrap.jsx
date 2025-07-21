import TableField from "@components/FormElements/TableField/TableField";
import WarningMessage from "@components/WarningMessage/WarningMessage";
import CheckboxField from "@components/FormElements/CheckboxField/CheckboxField";
import Tooltip from "@components/Tooltip/Tooltip";
import "./LiquidityBootstrap.css";

function LiquidityBootstrap({ data, updateField }) {
    return (
        <div className="step-container">
            <TableField
                label="Set exchange liquidity"
                columns={[]} // ToDO: add JSON values
                values={data.exchangeLiquidity || []}
                isRequired={true}
                tooltip={<Tooltip />}
            />
            <p className="liquidity-label">Total bootstrap value: $ {"0.00"}</p>

            <WarningMessage text="Liquidity added here is also counted as initial reserves" />

            <CheckboxField
                optionLabel="List on OpenStable Exchange"
                optionValue="true"
                changeHandler={(value) => {
                    updateField("listOnOpenStable", value);
                }}
                isChecked={data.listOnOpenStable === "true"}
            />
        </div>
    );
}

export default LiquidityBootstrap;
