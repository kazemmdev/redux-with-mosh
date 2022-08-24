import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from "moment";

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
      bugs.lastFetch = Date.now();
    },
    bugAssignToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.data.findIndex((bug) => bug.id === bugId);
      bugs.data[index].userId = userId;
    },
    bugAdded: (bugs, action) => {
      bugs.data[bugs.data.length] = action.payload;
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

const {
  bugAdded,
  bugAssignToUser,
  bugRemoved,
  bugResolved,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(lastFetch, "minutes");

  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignToUser.type,
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
