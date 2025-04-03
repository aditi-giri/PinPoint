import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import profileReducer from "./reducer/profileReducer";

/**
 * Steps for state management
 * 1. submit action
 * 2. handle action in its reducer
 * 3. register here -> reducer
 * 
 */

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer
    },
    devTools: process.env.NODE_ENV !== "production",
})