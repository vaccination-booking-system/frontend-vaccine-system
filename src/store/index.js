import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { userIdReducer, familyMemberReducer } from "./slice";

export default configureStore({
  reducer: {
    userId: userIdReducer,
    familyMember: familyMemberReducer,
  },
});
