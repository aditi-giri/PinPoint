import { fetchAPI } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (admin, thunkAPI) => {
        try {
            const { token, message } = await fetchAPI("POST", "/adminlogin", {
                email: admin.email,
                password: admin.password,
            });

           
            if (token) {
                localStorage.setItem("token", token);
            }

            return { token, message };
        } catch (error) {

            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);
