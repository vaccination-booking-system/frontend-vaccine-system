import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../network/apis";

const fetchUsers = createAsyncThunk("users/fetchUsers", async params => {
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
  getUsersResult: false,
  getUsersLoading: false,
  getUsersError: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.getUsersLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.getUsersLoading = false;
      state.getUsersResult = action.payload;
      state.getUsersError = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.getUsersLoading = false;
      state.getUsersResult = false;
      state.getUsersError = action.error.message;
    });
  },
});

export { fetchUsers };
export default usersSlice.reducer;
