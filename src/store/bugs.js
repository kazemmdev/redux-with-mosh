import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    buggAdded: (bugs, action) => {
      bugs[bugs.length] = {
        id: ++bugs.length,
        description: action.payload.description,
        resolved: false,
      };
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((item) => item?.id === action.payload.id);
      bugs[index].resolved = true;
    },
    bugRemoved: (bugs, action) => {
      const index = bugs.findIndex((item) => item?.id === action.payload.id);
      bugs.splice(index, 1);
    },
  },
});

export const { buggAdded, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;
