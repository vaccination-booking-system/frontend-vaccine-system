import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../network/apis";

const fetchUserById = createAsyncThunk("users/fetchUsers", async params => {
  const { token, userId } = params;
  console.log(token, userId);
  const res = await axiosInstance.get(`/api/v1/users/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  console.log(res);
  return res.data;
});

const initialState = {
  getUserByIdResult: false,
  getUserByIdLoading: false,
  getUserByIdError: false,
};

const userIdSlice = createSlice({
  name: "users",
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
