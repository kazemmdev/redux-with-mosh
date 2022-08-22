import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "bugs",
  initialState: {
    data: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
    bugsReceived: (bugs, action) => {
      bugs.data = action.payload;
      bugs.loading = false;
    },
    bugAssignToUser: (bugs, action) => {
      const { userId, bugId } = action.payload;
      const index = bugs.data.findIndex((bug) => bug.id === bugId);
      bugs.data[index].userId = userId;
    },
    bugAdded: (bugs, action) => {
      bugs.data[bugs.data.length] = {
        id: ++bugs.data.length,
        description: action.payload.description,
        resolved: false,
      };
    },
    bugResolved: (bugs, action) => {
      const index = bugs.data.findIndex((item) => item?.id === action.payload.id);
      bugs.data[index].resolved = true;
    },
    bugRemoved: (bugs, action) => {
      const index = bugs.data.findIndex((item) => item?.id === action.payload.id);
      bugs.data.splice(index, 1);
    },
  },
});

export const { bugAdded, bugAssignToUser, bugRemoved, bugResolved, bugsReceived, bugsRequested, bugsRequestFailed } =
  slice.actions;
export default slice.reducer;

const url = "/bugs1";
export const loadBugs = () =>
  apiCallBegan({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugsReceived.type,
    onError: bugsRequestFailed.type,
  });

// Selector
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);
export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
