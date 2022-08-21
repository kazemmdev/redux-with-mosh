import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (users, action) => {
      users[users.length] = {
        id: ++users.length,
        name: action.payload.name,
      };
    },
  },
});

export const { userAdded } = slice.actions;
export default slice.reducer;
