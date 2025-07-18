import { createSlice } from "@reduxjs/toolkit";

const isAuth = sessionStorage.getItem('isAuthenticated') === 'true';
const user = JSON.parse(sessionStorage.getItem('user')) || null;

const initialState = {
    isAuthenticated: isAuth,
    user: user,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
