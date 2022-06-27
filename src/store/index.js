import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userIdReducer from "./slice/users/GetUsers";

export default configureStore({
  reducer: {
    userId: userIdReducer,
  },
});
