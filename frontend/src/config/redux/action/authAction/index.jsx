import { fetchAPI } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, role }, thunkAPI) => {
    try {
      //Choose endpoint based on role
      const endpoint =
        role === "admin" ? "/adminlogin" : "/user/login";

      const { token, message } = await fetchAPI("POST", endpoint, {
        email,
        password,
      });
      const decoded = jwtDecode(token);

      if (token) {
        localStorage.setItem("token", token);
      }

      return { token,role: decoded.role, message };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message || "Login failed",
      });
    }
  }
);
