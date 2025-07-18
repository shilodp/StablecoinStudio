import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistToLocalStorage),
});

function persistToLocalStorage(storeAPI) {
    return (next) => (action) => {
        const result = next(action);
        const state = storeAPI.getState();

        localStorage.setItem("isAuthenticated", state.auth.isAuthenticated);
        localStorage.setItem("user", JSON.stringify(state.auth.user));

        return result;
    };
}

export default store;
