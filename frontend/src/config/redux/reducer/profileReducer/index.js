import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProfiles,
  getProfileById,
  createProfile,
  editProfile,
  deleteProfile,
} from "../../action/profileAction";

const initialState = {
  profiles: [],
  profile: null,
  loading: false,
  error: null,
  message: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileMessage: (state) => {
      state.message = null;
      state.error = null;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Profiles
      .addCase(getAllProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(getAllProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Get Profile by ID
      .addCase(getProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Create Profile
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles.push(action.payload.profile);
        state.message = action.payload.message;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Edit Profile
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = state.profiles.map((profile) =>
          profile._id === action.payload.profile._id
            ? action.payload.profile
            : profile
        );
        state.message = action.payload.message;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Delete Profile
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = state.profiles.filter(
          (profile) => profile._id !== action.payload.profileId
        );
        state.message = "Profile deleted successfully";
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearProfileMessage } = profileSlice.actions;
export default profileSlice.reducer;
