import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, createUser, removeProperty } from "../../action/userAction";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(removeProperty.fulfilled, (state, action) => {
        const { userId, profileId } = action.payload;
      
        const user = state.users.find((u) => u._id === userId);
        if (user) {
          user.profiles = user.profiles.filter(
            (p) => p._id !== profileId
          );
        }
      });
      
  },
});

export default userSlice.reducer;
