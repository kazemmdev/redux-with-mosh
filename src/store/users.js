import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (users, action) => {
      users.push({
        id: users.length++,
        name: action.payload.name,
        bugs: [],
      });
    },
    addBugToUser: (users, action) => {
      users.findIndex((user) => user.id === action.payload.id);
      users[index].bugs.push(action.payload.bugId);
    },
  },
});

export const { addUser, addBugToUser } = userSlice.actions;
export default userSlice.reducer;
