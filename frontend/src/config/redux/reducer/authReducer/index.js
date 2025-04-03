import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../action/authAction";

const initialState = {
    token: null, 
    isTokenThere: false, 
    loading: false,
    error: null,
    message: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isTokenThere = false;
            state.message = "Logged out successfully";
        },
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.isTokenThere = true; 
                state.message = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.token = null;
                state.isTokenThere = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
