import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../network/apis";

const fetchUserById = createAsyncThunk("userId/fetchUserId", async params => {
  const { token, id, isAdmin } = params;
  console.log(token, id, isAdmin);
  if (isAdmin) {
    const res = await axiosInstance.get(`/api/v1/admin/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    console.log(res);
    return res.data.data;
  } else {
    const res = await axiosInstance.get(`/api/v1/users/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return res.data.data;
  }
});

const initialState = {
  getUserByIdResult: false,
  getUserByIdLoading: false,
  getUserByIdError: false,
};

const userIdSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserById.pending, state => {
      state.getUserByIdLoading = true;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.getUserByIdLoading = false;
      state.getUserByIdResult = action.payload;
      state.getUserByIdError = false;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.getUserByIdLoading = false;
      state.getUserByIdResult = false;
      state.getUserByIdError = action.error.message;
    });
  },
});

export { fetchUserById };
export default userIdSlice.reducer;
