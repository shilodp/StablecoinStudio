import { createSlice } from "@reduxjs/toolkit";

const savedForm = JSON.parse(sessionStorage.getItem("formData")) || {
    stablecoinName: "",
    stablecoinSymbol: "",
    initialSupply: "",
    decimals: "",
    decimalsRadio: "block",
    metadata: undefined,
    basketAssets: [
        {
            asset: "USD",
            weight: 100,
            source: "OpenStable",
            customFormula: "",
        },
    ],
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
