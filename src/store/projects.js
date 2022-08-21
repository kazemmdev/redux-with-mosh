import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "project",
  initialState: [],
  reducers: {
    projectAdded: (projects, actions) => {
      projects[projects.length] = {
        id: ++projects.length,
        name: actions.payload.name,
      };
    },
    projectRemoved: (projects, action) => {
      const index = projects.findIndex((item) => item.id === action.payload.id);
      projects.splice(index, 1);
    },
  },
});

export const { projectAdded, projectRemoved } = slice.actions;
export default slice.reducer;

// selector
export const getProject = (state, id) => {
  return state.entities.projects.find((project) => project.id === id);
};
