import { createAction } from "@reduxjs/toolkit";

export const buggAdded = createAction("buggAdded");
export const bugResolved = createAction("bugResolved");
export const bugRemoved = createAction("bugRemoved");

export default function reducer(state = [], action) {
  switch (action.type) {
    case buggAdded.type:
      return [
        ...state,
        {
          id: ++state.length,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case bugResolved.type:
      return state.map((bug) => (bug.id === action.payload.id ? { ...bug, resolved: true } : bug));

    case bugRemoved.type:
      return state.filter((bug) => bug.id !== action.payload.id);
      
    default:
      return state;
  }
}
