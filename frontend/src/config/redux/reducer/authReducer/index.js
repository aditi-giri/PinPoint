import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../action/authAction";

const initialState = {
    token: null,
    role: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      restoreAuth: (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      },
      logout: (state) => {
        return initialState; 
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.token = action.payload.token;
          state.role = action.payload.role;
          state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    },
  });
  

export const { logout } = authSlice.actions;
export default authSlice.reducer;
