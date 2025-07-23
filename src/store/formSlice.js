import { createSlice } from "@reduxjs/toolkit";

const savedForm = JSON.parse(sessionStorage.getItem("formData")) || {
    stablecoinName: "",
    stablecoinSymbol: "",
    initialSupply: "",
    decimals: "18",
    accessTypeRadio: "block",
    metadata: undefined,
    basketAssets: [
        {
            asset: "USD",
            weight: 100,
            source: "OpenStable",
            customFormula: "",
        },
    ],
    accessType: "anyone",
    restrictedCountries: ["Cuba", "North Korea", "Iran", "Syria Arab Republic"],
    KYCProvider: "Shufti Pro",
    KYCFlagType: "Onchain",
    grantFlagToCreator: false,
    blockList: [],
    whiteList: [],
    adminAccessControl: "single",
    adminAddress: "",
    proxyAdmin: false,
    exchangeLiquidity: [
        {
            asset: "BTC",
            amount: Number(0).toFixed(2),
        },
    ],
    totalLiquidity: 0.0,
    listOnOpenStable: false,
    regulation: "United States jurisdiction",
    isCollateralised: false,
    collateralisedLink: "",
    PoRSupplyTransparency: false,
    PoRSupplyTransparencyLink: "",
    isYieldAvailable: false,
    YieldDistributionMethod: "Automated distribution",
    YieldTransparency: false,
    UserendMinting: false,
    KYCFlagForMint: false,
    assetsForMint: {
        USDT: false,
        USDC: false,
        BTC: false,
        custom: false,
    },
    OnRampForMint: false,
};

const initialState = {
    formData: savedForm,
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        updateField(state, action) {
            const { key, value } = action.payload;
            state.formData[key] = value;
        },
        resetForm(state) {
            state.formData = {};
        },
    },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
