import { createSelector, createSlice } from "@reduxjs/toolkit";
// import { createSelector } from "reselect";

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAssignToUser: (bugs, action) => {
      const { userId, bugId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },
    bugAdded: (bugs, action) => {
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

export const { bugAdded, bugAssignToUser, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
