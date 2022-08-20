import * as actions from "./actionTypes";

export const buggAdded = (description) => ({
  type: actions.BUG_ADDED,
  payload: { description },
});

export const bugResolved = (id) => ({
  type: actions.BUG_RESOLVED,
  payload: { id },
});

export const bugRemoved = (id) => ({
  type: actions.BUG_REMOVED,
  payload: { id },
});
