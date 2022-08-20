import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "project",
  initialState: [],
  reducers: {
    addProject: (projects, actions) => {
      projects[projects.length] = {
        id: ++projects.length,
        name: actions.payload.name,
      };
    },
    removeProject: (projects, action) => {
      const index = projects.findIndex((item) => item.id === action.payload.id);
      projects.splice(index, 1);
    },
  },
});

export const { addProject, removeProject } = slice.actions;
export default slice.reducer;
