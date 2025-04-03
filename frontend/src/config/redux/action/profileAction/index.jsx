import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Fetch all profiles
 */
export const getAllProfiles = createAsyncThunk(
  "profiles/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/api/getallprofiles");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleAPIError(error, "Failed to fetch profiles")
      );
    }
  }
);

/**
 * Fetch a profile by ID
 */
export const getProfileById = createAsyncThunk(
  "profiles/getById",
  async (profileId, { getState, rejectWithValue }) => {
    const { profile } = getState().profile;

    if (profile && profile._id === profileId) {
      return profile; 
    }

    try {
      const response = await clientServer.get(`/api/getprofile/${profileId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleAPIError(error, "Profile not found")
      );
    }
  }
);

/**
 * Create a new profile (Admin only)
 */
export const createProfile = createAsyncThunk(
  "profiles/create",
  async (profileData, thunkAPI) => {
    try {
      const response = await clientServer.post("/api/createprofile", profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleAPIError(error, "Failed to create profile")
      );
    }
  }
);

/**
 * Edit an existing profile (Admin only)
 */
export const editProfile = createAsyncThunk(
  "profiles/edit",
  async ({ profileId, profileData }, thunkAPI) => {
    try {
      const response = await clientServer.put(
        `/api/editprofile/${profileId}`,
        profileData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleAPIError(error, "Failed to update profile")
      );
    }
  }
);

/**
 * Delete a profile (Admin only)
 */
export const deleteProfile = createAsyncThunk(
  "profiles/delete",
  async (profileId, thunkAPI) => {
    try {
      await clientServer.delete(`/api/deleteprofile/${profileId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      return { profileId };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleAPIError(error, "Failed to delete profile")
      );
    }
  }
);

/**
 * Handle API errors with proper fallback messages
 */
const handleAPIError = (error, defaultMessage) => {
  return error.response?.data?.message || error.message || defaultMessage;
};
