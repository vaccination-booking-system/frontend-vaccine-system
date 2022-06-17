import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../network/apis";

const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axiosInstance.get("/api/v1/users/1", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc19hZG1pbiI6ZmFsc2UsInVzZXJfaWQiOjEsInVzZXJfbmlrIjoiMTIzNDU2Nzg5MDEyMzQ1NiIsImlhdCI6MTY1NTM2MTU2NCwiZXhwIjoxNjU1MzY1MTY0fQ.ohNjz8enIPs6Zm290atf0dtjCl5wBEuJUN23N6plA3M`,
    },
  });
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
