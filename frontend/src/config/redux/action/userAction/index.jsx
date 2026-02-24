import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "@/config";

// 🔹 Fetch all users (Admin)
export const getAllUsers = createAsyncThunk(
    "users/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await clientServer.get("/api/user/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch users"
            );
        }
    }
);

// 🔹 Create user
export const createUser = createAsyncThunk(
    "users/create",
    async (userData, thunkAPI) => {
        try {
            const res = await clientServer.post("/api/user/create", userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return res.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create user"
            );
        }
    }
);

// 🔹 Assign property to user
export const assignProperty = createAsyncThunk(
    "users/assignProperty",
    async ({ userId, profileId }, thunkAPI) => {
        try {
            await clientServer.put(
                "/api/user/assignProfile",
                { userId, profileId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            return { userId, profileId };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Assignment failed"
            );
        }
    }
);

// 🔹 Remove property from user (Admin)
export const removeProperty = createAsyncThunk(
    "users/removeProperty",
    async ({ userId, profileId }, thunkAPI) => {
        try {
            await clientServer.put(
                "/api/user/removeProperty",
                { userId, profileId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            return { userId, profileId };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to remove property"
            );
        }
    }
);
