import "./Summary.css";
import ResultsRows from "@components/ResultsRows/ResultsRows";
import TableField from "@components/FormElements/TableField/TableField";

function Summary({ data }) {
    const generalValues = [
        {
            label: "Name",
            value: data.stablecoinName,
        },
        {
            label: "Symbol",
            value: data.stablecoinSymbol,
        },
        {
            label: "Initial Supply",
            value: data.initialSupply,
        },
        {
            label: "Decimals",
            value: data.decimals,
        },
        {
            label: "Access Type",
            value: data.accessTypeRadio === "block" ? "Blacklist" : "Whitelist",
        },
    ];

    const pricingTableColumns = [
        {
            name: "asset",
            label: "Asset",
            type: "text",
        },
        {
            name: "weight",
            label: "Weight (%)",
            type: "text",
        },
        {
            name: "source",
            label: "Oracle Source",
            type: "text",
        },
    ];
    const pricingTableValues = data.basketAssets.map((item) => {
        if (item.source === "custom") {
            return {
                asset: item.asset,
                weight: item.weight,
                source: item.customFormula,
            };
        }
        return item;
    });

    const complianceValues = [
        {
            label: "Access type",
            value:
                data.accessType === "anyone"
                    ? "Open to anyone"
                    : "Gated / Restricted",
        },
        {
            label: "Restricted Countries",
            value: data.restrictedCountries.join(", "),
        },
    ];

    if (data.accessType === "restricted") {
        complianceValues.push(
            {
                label: "KYC Provider",
                value: data.KYCProvider,
            },
            {
                label: "KYC Flag Type",
                value: data.KYCFlagType,
            },
            {
                label: "Creator KYC Flag",
                value: data.grantFlagToCreator ? "Yes" : "No",
            }
        );
    }

    const permissionsValues = [
        {
            label: "Admin",
            value: data.adminAddress,
        },
        {
            label: "Proxy Admins",
            value: data.proxyAdmin ? "Yes" : "None",
        },
    ];

    const liquidityBootstrapValues = [
        {
            label: "Total bootstrap value",
            value: "$ " + data.totalLiquidity.toFixed(2),
        },
        {
            label: "List on OpenStable Exchange",
            value: data.listOnOpenStable ? "Yes" : "No",
        },
    ];

    const reservesYieldValues = [
        {
            label: "Regulation",
            value: data.regulation,
        },
        {
            label: "Collateralised by another on-chain asset",
            value: data.isCollateralised ? "Yes" : "No",
        },
        {
            label: "Proof-of-Reserve supply transparency",
            value: data.PoRSupplyTransparency ? "Yes" : "No",
        },
        {
            label: "Yield",
            value: data.isYieldAvailable
                ? data.YieldDistributionMethod
                : "Disabled",
        },
    ];

    if (data.isYieldAvailable) {
        reservesYieldValues.push({
            label: "Yield transparency",
            value: data.YieldTransparency ? "Yes" : "No",
        });
    }

    const mintingValues = [
        {
            label: "User-end minting ",
            value: !data.UserendMinting
                ? "Disabled"
                : data.KYCFlagForMint
                ? "KYC Flag Required"
                : "KYC Flag NOT Required",
        },
        {
            label: "Assets eligible for mint",
            value:
                data.assetsForMint.USDT ||
                data.assetsForMint.USDC ||
                data.assetsForMint.BTC ||
                data.assetsForMint.custom
                    ? "Yes"
                    : "No",
        },
    ];

    return (
        <div className="step-container summary-step">
            <h3 className="step-title">General</h3>
            <ResultsRows items={generalValues} />

            <h3 className="step-title">Pricing</h3>
            <TableField
                columns={pricingTableColumns}
                values={pricingTableValues}
            />

            <h3 className="step-title">Compliance</h3>
            <ResultsRows items={complianceValues} />

            <h3 className="step-title">Permissions</h3>
            <ResultsRows items={permissionsValues} />

            <h3 className="step-title">Liquidity Bootstrap</h3>
            <ResultsRows items={liquidityBootstrapValues} />

            <h3 className="step-title">Reserves + Yield</h3>
            <ResultsRows items={reservesYieldValues} />

            <h3 className="step-title">Minting</h3>
            <ResultsRows items={mintingValues} />
        </div>
    );
}

export default Summary;
