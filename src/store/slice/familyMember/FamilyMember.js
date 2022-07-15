import { createSlice } from "@reduxjs/toolkit";

const FamilyMemberSlice = createSlice({
  name: "family member",
  initialState: {
    memberOwner: {},
    member: [],
  },
  reducers: {
    setMemberOwner: (state, action) => {
      state.memberOwner = action.payload;
    },
    addMember: (state, action) => {
      state.member = [...state.member, action.payload];
    },
  },
});

export const { setMemberOwner, addMember } = FamilyMemberSlice.actions;

export default FamilyMemberSlice.reducer;
