import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistToSessionStorage),
});

function persistToSessionStorage(storeAPI) {
    return (next) => (action) => {
        const result = next(action);
        const state = storeAPI.getState();

        sessionStorage.setItem("isAuthenticated", state.auth.isAuthenticated);
        sessionStorage.setItem("user", JSON.stringify(state.auth.user));

        return result;
    };
}

export default store;
