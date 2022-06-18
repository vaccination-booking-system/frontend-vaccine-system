import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import usersReducer from "./slice/users/GetUsers";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
